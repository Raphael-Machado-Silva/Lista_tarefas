import { CATEGORIES } from '../utils/constants';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { value: 'all', label: 'Todas' },
    { value: CATEGORIES.DAILY, label: 'Diárias' },
    { value: CATEGORIES.WEEKLY, label: 'Semanais' },
    { value: CATEGORIES.MONTHLY, label: 'Mensais' },
    { value: CATEGORIES.YEARLY, label: 'Anuais' }
  ];

  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onCategoryChange(category.value)}
          className={`filter-button ${selectedCategory === category.value ? 'active' : ''}`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;