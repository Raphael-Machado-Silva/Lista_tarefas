export const CATEGORIES = {
  DAILY: 'diarias',
  WEEKLY: 'semanais', 
  MONTHLY: 'mensais',
  YEARLY: 'anuais'
};

export const STATUS = {
  PENDING: 'pendente',
  IN_PROGRESS: 'em-andamento',
  COMPLETED: 'concluida',
  EXPIRED: 'expirada' // Novo status
};

// Timers em milissegundos para cada categoria
export const CATEGORY_TIMERS = {
  [CATEGORIES.DAILY]: 24 * 60 * 60 * 1000, // 24 horas
  [CATEGORIES.WEEKLY]: 7 * 24 * 60 * 60 * 1000, // 7 dias
  [CATEGORIES.MONTHLY]: 30 * 24 * 60 * 60 * 1000, // 30 dias
  [CATEGORIES.YEARLY]: 365 * 24 * 60 * 60 * 1000 // 365 dias
};