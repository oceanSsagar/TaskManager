import './NoteModal.css';

function NoteModal({ show, onClose, onSave }) {
  if (!show) return null;

  let title = '';
  let note = '';
  let dueDate = new Date().toISOString().split('T')[0];

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSave({ title, note, dueDate });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Add Note</h2>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => (title = e.target.value)}
        />
        <textarea
          placeholder="Write your note..."
          rows="4"
          onChange={(e) => (note = e.target.value)}
        ></textarea>
        <input
          type="date"
          defaultValue={dueDate}
          onChange={(e) => (dueDate = e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose} className="cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default NoteModal;
