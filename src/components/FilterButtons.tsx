interface TProps {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}
const FilterButtons = ({ filter, setFilter }: TProps) => (
  <div className="flex gap-2">
    {["all", "credit", "debit"].map((type) => (
      <button
        key={type}
        onClick={() => setFilter(type)}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          filter === type
            ? "bg-blue-600 text-white"
            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
        }`}
      >
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </button>
    ))}
  </div>
);
export default FilterButtons;
