import { CheckCircle, Circle, Clock, Trash2, AlertCircle } from 'lucide-react';
import { STATUS } from '../utils/constants';

const TaskItem = ({ task, onToggleStatus, onDelete }) => {
  const getStatusIcon = () => {
    switch (task.status) {
      case STATUS.COMPLETED:
        return <CheckCircle className="completed" />;
      case STATUS.IN_PROGRESS:
        return <Clock className="in-progress" />;
      case STATUS.EXPIRED:
        return <AlertCircle className="expired" />;
      default:
        return <Circle className="pending" />;
    }
  };

  const getTimeRemaining = () => {
    if (task.status === STATUS.COMPLETED || task.status === STATUS.EXPIRED) {
      return null;
    }

    const now = new Date().getTime();
    const createdAt = new Date(task.createdAt).getTime();
    const timeElapsed = now - createdAt;
    const timeLimit = {
      diarias: 24 * 60 * 60 * 1000,
      semanais: 7 * 24 * 60 * 60 * 1000,
      mensais: 30 * 24 * 60 * 60 * 1000,
      anuais: 365 * 24 * 60 * 60 * 1000
    }[task.category];

    const timeRemaining = timeLimit - timeElapsed;

    if (timeRemaining <= 0) {
      return '⏰ Expirada!';
    }

    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;

    if (days > 0) {
      return `⏰ ${days}d ${remainingHours}h`;
    } else {
      return `⏰ ${hours}h`;
    }
  };

  return (
    <div className={`task-item ${task.status}`}>
      <div className="task-content">
        <button
          onClick={() => onToggleStatus(task.id)}
          className="status-button"
          title={task.status}
        >
          {getStatusIcon()}
        </button>
        
        <div className="task-info">
          <span className="task-title">{task.title}</span>
          <div className="task-meta">
            <span className="task-category">{task.category}</span>
            <span className="task-timer">{getTimeRemaining()}</span>
          </div>
        </div>
      </div>

      <div className="task-actions">
        <button
          onClick={() => onDelete(task.id)}
          className="action-button delete"
          title="Excluir tarefa"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

// CORREÇÃO: Export default no final
export default TaskItem;