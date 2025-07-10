import { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="app">
      <h1>TaskEase</h1>
      <FilterBar filter={filter} setFilter={setFilter} />
      <TaskList tasks={tasks} setTasks={setTasks} filter={filter} />
    </div>
  );
}

export default App;
