import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // ✅ Moved here so it can access the `filter` state
  const getHeading = () => {
    switch (filter) {
      case 'all': return 'All Tasks';
      case 'today': return 'Today’s Tasks';
      case 'upcoming': return 'Upcoming Tasks';
      case 'active': return 'Active Tasks';
      case 'completed': return 'Completed Tasks';
      default: return 'Tasks';
    }
  };

  return (
    <div className={`layout ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
      <aside className="sidebar">
        <button className="collapse-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
          &nbsp;☰&nbsp;&nbsp;
        </button>
        <h2>TaskManager</h2>
        <nav className="nav">
          <button
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'active-filter' : ''}
          >
            📋 All Tasks
          </button>
          <button
            onClick={() => setFilter('today')}
            className={filter === 'today' ? 'active-filter' : ''}
          >
            📅 Today
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={filter === 'upcoming' ? 'active-filter' : ''}
          >
            ⏳ Upcoming
          </button>
          <button
            onClick={() => setFilter('active')}
            className={filter === 'active' ? 'active-filter' : ''}
          >
            🟡 Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={filter === 'completed' ? 'active-filter' : ''}
          >
            ✅ Completed
          </button>
        </nav>
      </aside>

      <main className="main-content">
        <h1 className="page-heading">{getHeading()}</h1>
        <TaskList tasks={tasks} setTasks={setTasks} filter={filter} />
      </main>
    </div>
  );
}

export default App;
