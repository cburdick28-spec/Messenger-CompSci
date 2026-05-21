export type ResultsDateFilter = {
  from: string;
  to: string;
};

type Props = {
  value: ResultsDateFilter;
  onChange: (value: ResultsDateFilter) => void;
};

export default function ResultsFilter({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <label className="text-xs font-medium text-slate-600">
        From
        <input
          type="date"
          value={value.from}
          onChange={(event) => onChange({ ...value, from: event.target.value })}
          className="ml-1 rounded-md border border-slate-300 px-2 py-1 text-xs"
        />
      </label>
      <label className="text-xs font-medium text-slate-600">
        To
        <input
          type="date"
          value={value.to}
          onChange={(event) => onChange({ ...value, to: event.target.value })}
          className="ml-1 rounded-md border border-slate-300 px-2 py-1 text-xs"
        />
      </label>
      <button
        type="button"
        onClick={() => onChange({ from: "", to: "" })}
        className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
      >
        Clear
      </button>
    </div>
  );
}
