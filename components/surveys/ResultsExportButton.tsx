import type { SurveyQuestion, SurveyResponse } from "./SurveyCharts";

type Props = {
  surveyTitle: string;
  questions: SurveyQuestion[];
  responses: SurveyResponse[];
};

export default function ResultsExportButton({ surveyTitle, questions, responses }: Props) {
  const exportCsv = () => {
    const rows: string[][] = [["survey", "submitted_at", "question", "value"]];
    const questionById = new Map(questions.map((question) => [question.id, question]));

    responses.forEach((response) => {
      response.answers.forEach((answer) => {
        rows.push([surveyTitle, response.createdAt, questionById.get(answer.questionId)?.label ?? answer.questionId, answer.value]);
      });
    });

    const csv = rows
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${surveyTitle.toLowerCase().replace(/\s+/g, "-")}-results.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={exportCsv}
      className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-900 transition hover:bg-blue-100"
    >
      Export CSV
    </button>
  );
}
