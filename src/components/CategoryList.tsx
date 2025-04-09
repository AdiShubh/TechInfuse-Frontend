// components/CategoryFilter.tsx
import React from 'react';

interface Props {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  categories: string[];
}

const CategoryFilter: React.FC<Props> = ({
  selectedCategory,
  setSelectedCategory,
  categories,
}) => {
  return (
    <div className="flex gap-2 flex-wrap mb-6">
      <button
        onClick={() => setSelectedCategory('')}
        className={`btn btn-sm ${selectedCategory === '' ? 'btn-primary' : 'btn-outline'}`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelectedCategory(cat)}
          className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-outline'}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
