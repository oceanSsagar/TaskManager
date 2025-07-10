function TaskItem({ task, setTasks, tasks }) {
  const toggleComplete = () => {
    setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));
  };

  const handleDelete = () => {
    setTasks(tasks.filter(t => t.id !== task.id));
  };

  const handleDragStart = e => {
    e.dataTransfer.setData('task', JSON.stringify(task));
  };

  return (
    <div
      className={`task-item ${task.completed ? 'done' : ''}`}
      draggable
      onDragStart={handleDragStart}
    >
      <span onClick={toggleComplete}>{task.text}</span>
      <button onClick={handleDelete}>✕</button>
    </div>
  );
}

export default TaskItem;
