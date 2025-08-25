import { useState, useEffect } from 'react';
import { STATUS, CATEGORY_TIMERS } from '../utils/constants';

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  // Verificar tarefas expiradas periodicamente
  useEffect(() => {
    const checkExpiredTasks = () => {
      setValue(currentTasks => {
        const updatedTasks = currentTasks.map(task => {
          if (task.status === STATUS.COMPLETED || task.status === STATUS.EXPIRED) {
            return task;
          }

          const now = new Date().getTime();
          const createdAt = new Date(task.createdAt).getTime();
          const timeElapsed = now - createdAt;
          const timeLimit = CATEGORY_TIMERS[task.category];

          if (timeElapsed > timeLimit) {
            return { ...task, status: STATUS.EXPIRED };
          }

          return task;
        });

        return updatedTasks;
      });
    };

    // Verificar a cada minuto
    const interval = setInterval(checkExpiredTasks, 60000);
    checkExpiredTasks(); // Verificar imediatamente

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};