import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleStatus, onDelete, onEdit }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>Nenhuma tarefa encontrada</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;