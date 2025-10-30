import TransactionRow from "./TransactionRow";

interface TProps {
  transactions: {
    id: number;
    description: string;
    amount: number;
    type: string;
    date: string;
  }[];
}
const TransactionList = ({ transactions }: TProps) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        <p className="text-lg">No transactions found</p>
        <p className="text-sm mt-2">Add a transaction to get started</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left py-3 px-4 text-slate-600 font-semibold">
              Date
            </th>
            <th className="text-left py-3 px-4 text-slate-600 font-semibold">
              Description
            </th>
            <th className="text-left py-3 px-4 text-slate-600 font-semibold">
              Type
            </th>
            <th className="text-right py-3 px-4 text-slate-600 font-semibold">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TransactionList;
