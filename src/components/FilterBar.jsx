function FilterBar({ filter, setFilter }) {
  return (
    <div className="filter-bar">
      <button onClick={() => setFilter('all')}>All</button>
      <button onClick={() => setFilter('active')}>Active</button>
      <button onClick={() => setFilter('completed')}>Completed</button>
    </div>
  );
}

export default FilterBar;
