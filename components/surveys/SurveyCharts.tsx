import { Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export type SurveyQuestionType = "rating" | "multiple_choice" | "yes_no" | "text";

export type SurveyQuestion = {
  id: string;
  label: string;
  type: SurveyQuestionType;
  options?: string[];
};

export type SurveyAnswer = {
  questionId: string;
  value: string;
};

export type SurveyResponse = {
  id: string;
  createdAt: string;
  answers: SurveyAnswer[];
};

type Props = {
  question: SurveyQuestion;
  responses: SurveyResponse[];
};

const COLORS = ["#002266", "#8B0000", "#4F7FF1", "#94A3B8", "#D97706"];

const getValues = (questionId: string, responses: SurveyResponse[]) =>
  responses
    .flatMap((response) => response.answers)
    .filter((answer) => answer.questionId === questionId)
    .map((answer) => answer.value);

export default function SurveyCharts({ question, responses }: Props) {
  const values = getValues(question.id, responses);

  if (question.type === "rating") {
    const data = [1, 2, 3, 4, 5].map((star) => ({
      name: `${star}★`,
      value: values.filter((value) => Number(value) === star).length,
    }));
    return (
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {data.map((entry, idx) => (
                <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  const pieData =
    question.type === "yes_no"
      ? ["yes", "no"].map((option) => ({ name: option, value: values.filter((value) => value === option).length }))
      : (question.options ?? []).map((option) => ({ name: option, value: values.filter((value) => value === option).length }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            innerRadius={question.type === "yes_no" ? 56 : 0}
            outerRadius={86}
            label
          >
            {pieData.map((entry, idx) => (
              <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
