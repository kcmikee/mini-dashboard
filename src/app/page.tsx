"use client";
import { useState, useEffect, useMemo } from "react";
import { Download, Plus, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import * as XLSX from "xlsx";

import SummaryCard from "@/components/SummaryCard";
import FilterButtons from "@/components/FilterButtons";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import Modal from "@/components/modals";
import { initialData } from "@/utils/constants";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: string;
  date: string;
}

const TransactionDashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("transactions");
    if (stored) {
      setTimeout(() => setTransactions(JSON.parse(stored)), 0);
    } else {
      setTimeout(() => setTransactions(initialData), 0);
      localStorage.setItem("transactions", JSON.stringify(initialData));
    }
  }, []);

  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "credit",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    if (filter === "all") return transactions;
    return transactions.filter((t: Transaction) => t.type === filter);
  }, [transactions, filter]);

  const summary = useMemo(() => {
    const inflow = transactions
      .filter((t: Transaction) => t.type === "credit")
      .reduce((sum, t: Transaction) => sum + t.amount, 0);
    const outflow = transactions
      .filter((t: Transaction) => t.type === "debit")
      .reduce((sum, t: Transaction) => sum + t.amount, 0);
    return {
      inflow,
      outflow,
      balance: inflow - outflow,
    };
  }, [transactions]);

  const handleSubmit = () => {
    if (!formData.description || !formData.amount) return;

    const newTransaction: Transaction = {
      id: Date.now(),
      description: formData.description,
      amount: parseFloat(formData.amount),
      type: formData.type,
      date: formData.date,
    };
    setTransactions([newTransaction, ...transactions]);
    setFormData({
      description: "",
      amount: "",
      type: "credit",
      date: new Date().toISOString().split("T")[0],
    });
    setShowModal(false);
  };

  const exportToCSV = () => {
    const headers = ["ID", "Description", "Amount", "Type", "Date"];
    const rows = filteredTransactions.map((t: Transaction) => [
      t.id,
      t.description,
      t.amount,
      t.type,
      t.date,
    ]);
    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions_${filter}_${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToExcel = () => {
    const data = filteredTransactions.map((t: Transaction) => ({
      ID: t.id,
      Description: t.description,
      Amount: t.amount,
      Type: t.type,
      Date: t.date,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");
    XLSX.writeFile(
      wb,
      `transactions_${filter}_${new Date().toISOString().split("T")[0]}.xlsx`
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Transaction Dashboard
          </h1>
          <p className="text-slate-600">
            Manage and track your financial transactions
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <SummaryCard
            title="Total Inflow"
            amount={summary.inflow}
            icon={<TrendingUp className="w-6 h-6" />}
            color="text-green-600"
            bgColor="bg-green-50"
          />
          <SummaryCard
            title="Total Outflow"
            amount={summary.outflow}
            icon={<TrendingDown className="w-6 h-6" />}
            color="text-red-600"
            bgColor="bg-red-50"
          />
          <SummaryCard
            title="Net Balance"
            amount={summary.balance}
            icon={<Wallet className="w-6 h-6" />}
            color={summary.balance >= 0 ? "text-blue-600" : "text-red-600"}
            bgColor="bg-blue-50"
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <FilterButtons filter={filter} setFilter={setFilter} />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex-1 md:flex-none justify-center"
              >
                <Download className="w-4 h-4" />
                CSV
              </button>
              <button
                onClick={exportToExcel}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex-1 md:flex-none justify-center"
              >
                <Download className="w-4 h-4" />
                Excel
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex-1 md:flex-none justify-center"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
          </div>

          <TransactionList transactions={filteredTransactions} />
        </div>

        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <TransactionForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              onCancel={() => setShowModal(false)}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default TransactionDashboard;

// const [transactions, setTransactions] = useState<Transaction[]>(() => {
//   const stored =
//     typeof window !== "undefined"
//       ? localStorage.getItem("transactions")
//       : null;
//   if (stored) {
//     return JSON.parse(stored);
//   }
//   const x =
//     typeof window !== "undefined"
//       ? localStorage.setItem("transactions", JSON.stringify(initialData))
//       : null;

//   return x ? initialData : initialData;
// });
