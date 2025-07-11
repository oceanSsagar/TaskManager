import { useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';


const getRandomColor = () => {
  const colors = [
    '#fef6e4', '#e4f9f5', '#ffe5ec',
    '#e0f7fa', '#f0e5ff', '#fcefe3',
    '#e6ffed', '#fff3cd', '#e3f2fd'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

function TaskItem({ task, setTasks, tasks, onComplete }) {
  const colorRef = useRef(getRandomColor());

  const handleDelete = () => {
    setTasks(tasks.filter(t => t.id !== task.id));
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('task', JSON.stringify(task));
  };

  const controls = useAnimation();

  const handleComplete = async () => {
    await controls.start({
      x: 500, // swipe out right
      opacity: 0,
      transition: { duration: 0.3 }
    });

    if (!task.completed) {
      setTasks(tasks.map(t =>
        t.id === task.id ? { ...t, completed: true } : t
      ));
      onComplete?.(); // trigger snackbar
    }
  };




  return (
    <motion.div
      className={`task-item ${task.completed ? 'done' : ''}`}
      drag="x"
      dragConstraints={false}
      onDragEnd={(e, info) => {
        console.log(info.offset.x);
        if (Math.abs(info.offset.x) > 100) {
          handleComplete();
        }
      }}
      whileDrag={{ scale: 1.05, opacity: 0.9 }}
      animate={controls}
      initial={{ x: 0, opacity: 1 }}
      style={{
        background: colorRef.current,
        borderRadius: '10px',
        padding: '1rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        cursor: 'grab',
        height: '200px',
        width: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        touchAction: 'pan-y',
        userSelect: 'none',
        position: 'relative',
      }}
    >

      <div>
        <h3>{task.text}</h3>
        <p style={{ fontSize: '0.85rem', color: '#555' }}>{task.note}</p>
      </div>
      <small style={{ color: '#666' }}>📅 {task.dueDate}</small>
      <button
        onClick={handleDelete}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: 'transparent',
          border: 'none',
          fontSize: '1rem',
          color: '#333',
          cursor: 'pointer',
        }}
      >
        ✕
      </button>
    </motion.div>
  );
}

export default TaskItem;
