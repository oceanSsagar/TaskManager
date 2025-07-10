import { useState } from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, setTasks, filter }) {
  const [newTask, setNewTask] = useState('');

  const filtered = tasks.filter(t =>
    filter === 'all' ? true :
    filter === 'active' ? !t.completed :
    t.completed
  );

  const handleAdd = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask('');
  };

  const handleDrop = (e, index) => {
    const dragged = JSON.parse(e.dataTransfer.getData('task'));
    const updated = tasks.filter(t => t.id !== dragged.id);
    updated.splice(index, 0, dragged);
    setTasks(updated);
  };

  return (
    <div className="task-list">
      <div className="new-task">
        <input
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Add task..."
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {filtered.map((task, i) => (
        <div key={task.id} onDrop={e => handleDrop(e, i)} onDragOver={e => e.preventDefault()}>
          <TaskItem task={task} setTasks={setTasks} tasks={tasks} />
        </div>
      ))}
    </div>
  );
}

export default TaskList;
