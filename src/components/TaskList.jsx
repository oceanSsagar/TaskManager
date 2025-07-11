import { useState } from 'react';
import TaskItem from './TaskItem';
import NoteModal from './NoteModal';
import Snackbar from './Snackbar';

function TaskList({ tasks, setTasks, filter }) {
  const [showModal, setShowModal] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false); // ✅ Move this inside component

  const today = new Date().toISOString().split('T')[0];

  const filtered = tasks.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    if (filter === 'today') return t.dueDate === today;
    if (filter === 'upcoming') return t.dueDate > today;
    return true;
  });

  const handleSave = ({ title, note, dueDate }) => {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: title,
        note,
        dueDate,
        completed: false,
      }
    ]);
  };

  const handleDrop = (e, index) => {
    const dragged = JSON.parse(e.dataTransfer.getData('task'));
    const updated = tasks.filter(t => t.id !== dragged.id);
    updated.splice(index, 0, dragged);
    setTasks(updated);
  };

  return (
    <>
      <div className="note-grid">
        {filtered.map((task, i) => (
          <div
            key={task.id}
            onDrop={(e) => handleDrop(e, i)}
            onDragOver={(e) => e.preventDefault()}
          >
            <TaskItem
              task={task}
              setTasks={setTasks}
              tasks={tasks}
              onComplete={() => setShowSnackbar(true)}
            />
          </div>
        ))}

        <button className="fab-button" onClick={() => setShowModal(true)}>
          +
        </button>

        <NoteModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      </div>

      <Snackbar
        message="Task marked as completed!"
        show={showSnackbar}
        onClose={() => setShowSnackbar(false)}
      />
    </>
  );
}

export default TaskList;
