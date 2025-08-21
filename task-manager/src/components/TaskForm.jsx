import { useState } from 'react';
import { Plus } from 'lucide-react';
import { CATEGORIES, STATUS } from '../utils/constants';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES.DAILY);
  const [status, setStatus] = useState(STATUS.PENDING);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask({
        id: Date.now(),
        title: title.trim(),
        category,
        status,
        createdAt: new Date().toISOString()
      });
      setTitle('');
      setCategory(CATEGORIES.DAILY);
      setStatus(STATUS.PENDING);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-row">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Digite uma nova tarefa..."
          className="task-input"
        />
        <button type="submit" className="add-button">
          <Plus size={20} />
        </button>
      </div>
      
      <div className="form-options">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="category-select"
        >
          <option value={CATEGORIES.DAILY}>Diária</option>
          <option value={CATEGORIES.WEEKLY}>Semanal</option>
          <option value={CATEGORIES.MONTHLY}>Mensal</option>
          <option value={CATEGORIES.YEARLY}>Anual</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="status-select"
        >
          <option value={STATUS.PENDING}>Pendente</option>
          <option value={STATUS.IN_PROGRESS}>Em Andamento</option>
          <option value={STATUS.COMPLETED}>Concluída</option>
        </select>
      </div>
    </form>
  );
};

export default TaskForm;