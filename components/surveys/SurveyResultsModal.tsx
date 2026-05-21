"use client";

import { useMemo, useState } from "react";
import ResultsExportButton from "./ResultsExportButton";
import ResultsFilter, { type ResultsDateFilter } from "./ResultsFilter";
import SurveyCharts, { type SurveyQuestion, type SurveyResponse } from "./SurveyCharts";
import SurveyFeedback from "./SurveyFeedback";

type Props = {
  open: boolean;
  surveyTitle: string;
  questions: SurveyQuestion[];
  responses: SurveyResponse[];
  onClose: () => void;
};

const withinRange = (createdAt: string, filter: ResultsDateFilter) => {
  const created = new Date(createdAt);
  if (filter.from) {
    const from = new Date(`${filter.from}T00:00:00`);
    if (created < from) return false;
  }
  if (filter.to) {
    const to = new Date(`${filter.to}T23:59:59.999`);
    if (created > to) return false;
  }
  return true;
};

export default function SurveyResultsModal({ open, surveyTitle, questions, responses, onClose }: Props) {
  const [filter, setFilter] = useState<ResultsDateFilter>({ from: "", to: "" });

  const filteredResponses = useMemo(() => responses.filter((response) => withinRange(response.createdAt, filter)), [responses, filter]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4" onClick={onClose}>
      <section
        className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold text-blue-950">{surveyTitle} Results</h2>
            <p className="text-sm text-slate-500">{filteredResponses.length} responses</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ResultsFilter value={filter} onChange={setFilter} />
            <ResultsExportButton surveyTitle={surveyTitle} questions={questions} responses={filteredResponses} />
            <button className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold" onClick={onClose}>
              Close
            </button>
          </div>
        </header>

        {!filteredResponses.length ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">No responses yet.</div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {questions
                .filter((question) => question.type !== "text")
                .map((question) => (
                  <article key={question.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-sm">
                    <h3 className="mb-2 text-sm font-semibold text-slate-900">{question.label}</h3>
                    <SurveyCharts question={question} responses={filteredResponses} />
                  </article>
                ))}
            </div>

            <section className="rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-sm">
              <h3 className="mb-2 text-sm font-semibold text-slate-900">Text Feedback</h3>
              <SurveyFeedback questions={questions} responses={filteredResponses} />
            </section>
          </div>
        )}
      </section>
    </div>
  );
}
