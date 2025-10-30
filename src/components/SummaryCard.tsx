import { formatter } from "@/utils";

interface TProps {
  title: string;
  amount: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const SummaryCard = ({ title, amount, icon, color, bgColor }: TProps) => (
  <div className={`${bgColor} rounded-xl p-6 border border-slate-200`}>
    <div className="flex items-center justify-between mb-2">
      <span className="text-slate-600 text-sm font-medium">{title}</span>
      <div className={color}>{icon}</div>
    </div>
    <p className={`text-3xl font-bold ${color}`}>{formatter.format(amount)}</p>
  </div>
);

export default SummaryCard;
