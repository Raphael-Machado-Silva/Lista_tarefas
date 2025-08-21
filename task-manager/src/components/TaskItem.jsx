import { CheckCircle, Circle, Clock, Trash2, Edit3 } from 'lucide-react';
import { STATUS } from '../utils/constants';

const TaskItem = ({ task, onToggleStatus, onDelete, onEdit }) => {
  const getStatusIcon = () => {
    switch (task.status) {
      case STATUS.COMPLETED:
        return <CheckCircle className="completed" />;
      case STATUS.IN_PROGRESS:
        return <Clock className="in-progress" />;
      default:
        return <Circle className="pending" />;
    }
  };

  const getStatusText = () => {
    switch (task.status) {
      case STATUS.COMPLETED:
        return 'Concluída';
      case STATUS.IN_PROGRESS:
        return 'Em Andamento';
      default:
        return 'Pendente';
    }
  };

  return (
    <div className={`task-item ${task.status}`}>
      <div className="task-content">
        <button
          onClick={() => onToggleStatus(task.id)}
          className="status-button"
          title={getStatusText()}
        >
          {getStatusIcon()}
        </button>
        
        <div className="task-info">
          <span className="task-title">{task.title}</span>
          <span className="task-category">{task.category}</span>
        </div>
      </div>

      <div className="task-actions">
        <button
          onClick={() => onEdit(task)}
          className="action-button edit"
          title="Editar tarefa"
        >
          <Edit3 size={16} />
        </button>
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

export default TaskItem;