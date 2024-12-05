import { ChartType } from "chart.js";
import { Bar, Bubble, Doughnut, Line, Pie, PolarArea, Scatter, Radar } from "react-chartjs-2";

export const Components: Record<ChartType, (props: any) => JSX.Element> = {
    'doughnut': Doughnut,
    'line': Line,
    'bar': Bar,
    'bubble': Bubble,
    pie: Pie,
    polarArea: PolarArea,
    radar: Radar,
    scatter: Scatter,
}