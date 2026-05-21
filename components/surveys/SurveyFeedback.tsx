import type { SurveyQuestion, SurveyResponse } from "./SurveyCharts";

type Props = {
  questions: SurveyQuestion[];
  responses: SurveyResponse[];
};

export default function SurveyFeedback({ questions, responses }: Props) {
  const textQuestionIds = new Set(questions.filter((question) => question.type === "text").map((question) => question.id));

  const feedback = responses
    .flatMap((response) =>
      response.answers
        .filter((answer) => textQuestionIds.has(answer.questionId) && answer.value.trim())
        .map((answer) => ({ value: answer.value, createdAt: response.createdAt }))
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (!feedback.length) {
    return <p className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">No text feedback yet.</p>;
  }

  return (
    <div className="max-h-56 space-y-2 overflow-y-auto pr-2">
      {feedback.map((item, idx) => (
        <article key={`${item.createdAt}-${idx}`} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
          <p className="text-sm text-slate-800">{item.value}</p>
          <time className="mt-1 block text-xs text-slate-500">{new Date(item.createdAt).toLocaleString()}</time>
        </article>
      ))}
    </div>
  );
}
