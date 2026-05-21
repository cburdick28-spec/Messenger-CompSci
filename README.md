# Brewster App

## Surveys analytics (implemented)

This repository now includes a live survey analytics experience in the existing `app.js` surveys screen:

- Staff/admin-only **View Results** button on each survey card
- Modal analytics dashboard with:
  - 1–5 rating bar breakdown + average/total stats
  - Multiple-choice pie-style breakdown
  - Donut-style positive/needs-work split
  - Scrollable text feedback with timestamps
- Date filtering and CSV export
- Loading skeleton, empty/error states, and responsive layout
- Supabase realtime refresh on `survey_responses` inserts/updates/deletes (when available)

### Existing app integration

No framework migration is required. Analytics is wired directly into:

- `app.js` (survey UI + analytics logic)
- `style.css` (analytics modal and chart styles)

### Optional Next.js/TypeScript component set

For future App Router migration, typed React components were added under:

- `components/surveys/SurveyResultsModal.tsx`
- `components/surveys/SurveyCharts.tsx`
- `components/surveys/SurveyFeedback.tsx`
- `components/surveys/ResultsExportButton.tsx`
- `components/surveys/ResultsFilter.tsx`

If you use those components in a Next.js app, install chart dependencies first:

```bash
npm install recharts
```
