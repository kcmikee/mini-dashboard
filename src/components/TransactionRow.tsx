import { formatter } from "@/utils";

interface TProps {
  transaction: {
    id: number;
    description: string;
    amount: number;
    type: string;
    date: string;
  };
}
const TransactionRow = ({ transaction }: TProps) => (
  <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
    <td className="py-4 px-4 text-slate-600">{transaction.date}</td>
    <td className="py-4 px-4 text-slate-800 font-medium">
      {transaction.description}
    </td>
    <td className="py-4 px-4">
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          transaction.type === "credit"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {transaction.type.toUpperCase()}
      </span>
    </td>
    <td
      className={`py-4 px-4 text-right font-semibold ${
        transaction.type === "credit" ? "text-green-600" : "text-red-600"
      }`}
    >
      {transaction.type === "credit" ? "+" : "-"}
      {formatter.format(transaction.amount)}
    </td>
  </tr>
);
export default TransactionRow;
