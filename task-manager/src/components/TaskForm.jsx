import { useState } from 'react';
import { Plus } from 'lucide-react';
import { CATEGORIES, STATUS, CATEGORY_TIMERS } from '../utils/constants';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES.DAILY);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask({
        id: Date.now(),
        title: title.trim(),
        category,
        status: STATUS.PENDING,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + CATEGORY_TIMERS[category]).toISOString()
      });
      setTitle('');
      setCategory(CATEGORIES.DAILY);
    }
  };

  const getTimerText = () => {
    const timer = CATEGORY_TIMERS[category];
    if (timer === CATEGORY_TIMERS[CATEGORIES.DAILY]) return '⏰ Expira em 24h';
    if (timer === CATEGORY_TIMERS[CATEGORIES.WEEKLY]) return '⏰ Expira em 7 dias';
    if (timer === CATEGORY_TIMERS[CATEGORIES.MONTHLY]) return '⏰ Expira em 30 dias';
    return '⏰ Expira em 1 ano';
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
          <option value={CATEGORIES.DAILY}>Diária (24h)</option>
          <option value={CATEGORIES.WEEKLY}>Semanal (7 dias)</option>
          <option value={CATEGORIES.MONTHLY}>Mensal (30 dias)</option>
          <option value={CATEGORIES.YEARLY}>Anual (365 dias)</option>
        </select>

        <span className="timer-info">
          {getTimerText()}
        </span>
      </div>
    </form>
  );
};

export default TaskForm;