-- Run this in Supabase SQL Editor
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  created_at timestamptz not null default now()
);

create table if not exists public.contacts (
  owner_id uuid not null references public.profiles(id) on delete cascade,
  contact_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (owner_id, contact_id),
  constraint contacts_not_self check (owner_id <> contact_id)
);

create table if not exists public.chat_groups (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  created_by uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.group_members (
  group_id uuid not null references public.chat_groups(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (group_id, user_id)
);

create table if not exists public.messages (
  id bigint generated always as identity primary key,
  kind text not null check (kind in ('dm','group')),
  dm_a uuid references public.profiles(id) on delete cascade,
  dm_b uuid references public.profiles(id) on delete cascade,
  group_id uuid references public.chat_groups(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  text text not null,
  created_at timestamptz not null default now(),
  constraint dm_shape check (
    (kind = 'dm' and dm_a is not null and dm_b is not null and group_id is null)
    or
    (kind = 'group' and group_id is not null and dm_a is null and dm_b is null)
  )
);

create table if not exists public.admin_users (
  email text primary key,
  created_at timestamptz not null default now(),
  created_by uuid references public.profiles(id) on delete set null
);

create table if not exists public.user_moderation (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  is_banned boolean not null default false,
  timeout_until timestamptz,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles(id) on delete set null
);

create table if not exists public.pending_registrations (
  email text primary key,
  token_hash text not null,
  token_expires_at timestamptz not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  requested_at timestamptz not null default now(),
  approved_at timestamptz,
  approved_by text,
  invite_sent_at timestamptz
);

create or replace function public.app_has_admin()
returns boolean
language sql
stable
as $$
  select true;
$$;

create or replace function public.app_is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and lower(p.email) in (
        'cburdick28@brewstermadrid.com',
        'lbondi28@brewstermadrid.com',
        'arosario28@brewstermadrid.com'
      )
  );
$$;

create or replace function public.app_is_restricted(p_user_id uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.user_moderation um
    where um.user_id = p_user_id
      and (
        um.is_banned
        or (um.timeout_until is not null and um.timeout_until > now())
      )
  );
$$;

create or replace function public.app_is_quick_message(p_text text)
returns boolean
language sql
immutable
as $$
  select p_text = any (
    array[
      'Hey, what''s up?',
      'On my way.',
      'Running a few minutes late.',
      'Can we talk later?',
      'I''m here.',
      'Sounds good to me.',
      'Thanks, I appreciate it.',
      'No worries.',
      'Let me check and get back to you.',
      'Talk soon.',
      '😀',
      '😂',
      '😎',
      '🔥',
      '👍',
      '👀',
      '🎉',
      '❤️',
      '🙌',
      '😅'
    ]::text[]
  );
$$;

alter table public.profiles enable row level security;
alter table public.contacts enable row level security;
alter table public.chat_groups enable row level security;
alter table public.group_members enable row level security;
alter table public.messages enable row level security;
alter table public.admin_users enable row level security;
alter table public.user_moderation enable row level security;
alter table public.pending_registrations enable row level security;

drop policy if exists profiles_select_all on public.profiles;
create policy profiles_select_all on public.profiles
  for select to authenticated using (true);

drop policy if exists profiles_insert_self on public.profiles;
create policy profiles_insert_self on public.profiles
  for insert to authenticated with check (id = auth.uid());

drop policy if exists profiles_update_self on public.profiles;
create policy profiles_update_self on public.profiles
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

drop policy if exists contacts_select_owner on public.contacts;
create policy contacts_select_owner on public.contacts
  for select to authenticated using (owner_id = auth.uid());

drop policy if exists contacts_insert_owner on public.contacts;
create policy contacts_insert_owner on public.contacts
  for insert to authenticated with check (owner_id = auth.uid());

drop policy if exists chat_groups_select_all on public.chat_groups;
create policy chat_groups_select_all on public.chat_groups
  for select to authenticated using (true);

drop policy if exists chat_groups_insert_creator on public.chat_groups;
create policy chat_groups_insert_creator on public.chat_groups
  for insert to authenticated with check (created_by = auth.uid());

drop policy if exists group_members_select_member on public.group_members;
create policy group_members_select_member on public.group_members
  for select to authenticated using (user_id = auth.uid());

drop policy if exists group_members_insert_self on public.group_members;
create policy group_members_insert_self on public.group_members
  for insert to authenticated with check (user_id = auth.uid());

drop policy if exists messages_select_visible on public.messages;
create policy messages_select_visible on public.messages
  for select to authenticated using (
    public.app_is_admin()
    or
    (kind = 'dm' and auth.uid() in (dm_a, dm_b))
    or
    (kind = 'group' and exists (
      select 1 from public.group_members gm
      where gm.group_id = messages.group_id and gm.user_id = auth.uid()
    ))
  );

drop policy if exists messages_insert_dm on public.messages;
create policy messages_insert_dm on public.messages
  for insert to authenticated with check (
    kind = 'dm'
    and sender_id = auth.uid()
    and auth.uid() in (dm_a, dm_b)
    and not public.app_is_restricted(auth.uid())
    and (
      public.app_is_admin()
      or public.app_is_quick_message(text)
    )
  );

drop policy if exists messages_insert_group on public.messages;
create policy messages_insert_group on public.messages
  for insert to authenticated with check (
    kind = 'group'
    and sender_id = auth.uid()
    and not public.app_is_restricted(auth.uid())
    and (
      public.app_is_admin()
      or public.app_is_quick_message(text)
    )
    and exists (
      select 1 from public.group_members gm
      where gm.group_id = messages.group_id and gm.user_id = auth.uid()
    )
  );

drop policy if exists admin_users_select_admin on public.admin_users;
create policy admin_users_select_admin on public.admin_users
  for select to authenticated using (public.app_is_admin());

drop policy if exists admin_users_insert_bootstrap_or_admin on public.admin_users;
create policy admin_users_insert_bootstrap_or_admin on public.admin_users
  for insert to authenticated with check (
    (
      not public.app_has_admin()
      and lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
      and created_by = auth.uid()
    )
    or
    (
      public.app_is_admin()
      and created_by = auth.uid()
    )
  );

drop policy if exists admin_users_delete_admin on public.admin_users;
create policy admin_users_delete_admin on public.admin_users
  for delete to authenticated using (public.app_is_admin());

drop policy if exists user_moderation_select_admin_or_self on public.user_moderation;
create policy user_moderation_select_admin_or_self on public.user_moderation
  for select to authenticated using (
    public.app_is_admin() or user_id = auth.uid()
  );

drop policy if exists user_moderation_insert_admin on public.user_moderation;
create policy user_moderation_insert_admin on public.user_moderation
  for insert to authenticated with check (
    public.app_is_admin()
    and updated_by = auth.uid()
    and user_id <> auth.uid()
  );

drop policy if exists user_moderation_update_admin on public.user_moderation;
create policy user_moderation_update_admin on public.user_moderation
  for update to authenticated using (public.app_is_admin())
  with check (
    public.app_is_admin()
    and updated_by = auth.uid()
    and user_id <> auth.uid()
  );

drop policy if exists user_moderation_delete_admin on public.user_moderation;
create policy user_moderation_delete_admin on public.user_moderation
  for delete to authenticated using (public.app_is_admin());
