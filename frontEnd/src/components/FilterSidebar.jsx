import { FaFilter } from "react-icons/fa";

const FilterSidebar = ({
  tags,
  tag,
  setTag,
  sort,
  setSort,
  onApply,
  onReset,
}) => {
  return (
    <div className="w-72 h-fit bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 sticky top-24">
      <div className="flex items-center gap-2 mb-5">
        <FaFilter className="text-primary-300" />
        <h2 className="text-xl font-bold text-white">Filters</h2>
      </div>

      <div className="mb-5">
        <label className="block text-sm mb-2 text-gray-300">Category</label>

        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="w-full rounded-lg bg-slate-800 border border-slate-600 p-2 text-white"
        >
          <option value="">All</option>

          {tags.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm mb-2 text-gray-300">Sort</label>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full rounded-lg bg-slate-800 border border-slate-600 p-2 text-white"
        >
          <option value="">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      <button
        onClick={onApply}
        className="w-full bg-primary-500 hover:bg-primary-600 rounded-lg py-2 font-semibold"
      >
        Apply Filters
      </button>

      <button
        onClick={onReset}
        className="w-full mt-3 border border-gray-500 rounded-lg py-2 hover:bg-white/10"
      >
        Reset
      </button>
    </div>
  );
};

export default FilterSidebar;
