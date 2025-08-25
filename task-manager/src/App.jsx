import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import CategoryFilter from './components/CategoryFilter';
import { CATEGORIES, STATUS } from './utils/constants';
import './App.css';

function App() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingTask, setEditingTask] = useState(null);

  const filteredTasks = selectedCategory === 'all' 
    ? tasks 
    : tasks.filter(task => task.category === selectedCategory);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    setEditingTask(null);
  };

  // No toggleStatus, adicione verificação para não alterar tarefas expiradas
const toggleStatus = (taskId) => {
  setTasks(tasks.map(task => {
    if (task.id === taskId && task.status !== STATUS.EXPIRED) {
      let newStatus;
      switch (task.status) {
        case STATUS.PENDING:
          newStatus = STATUS.IN_PROGRESS;
          break;
        case STATUS.IN_PROGRESS:
          newStatus = STATUS.COMPLETED;
          break;
        default:
          newStatus = STATUS.PENDING;
      }
      return { ...task, status: newStatus };
    }
    return task;
  }));
};

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleSaveEdit = (updatedTask) => {
    updateTask(updatedTask);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📋 Gerenciador de Tarefas</h1>
        <p>Organize suas tarefas diárias, semanais, mensais e anuais</p>
      </header>

      <main className="app-main">
        <TaskForm 
          onAddTask={addTask} 
          editingTask={editingTask}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={() => setEditingTask(null)}
        />

        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="stats">
          <span>Total: {tasks.length}</span>
          <span>Concluídas: {tasks.filter(t => t.status === STATUS.COMPLETED).length}</span>
          <span>Em Andamento: {tasks.filter(t => t.status === STATUS.IN_PROGRESS).length}</span>
        </div>

        <TaskList
          tasks={filteredTasks}
          onToggleStatus={toggleStatus}
          onDelete={deleteTask}
          onEdit={handleEdit}
        />
      </main>
    </div>
  );
}

export default App;