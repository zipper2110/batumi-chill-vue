<script setup lang="ts">
import type { LocationCategory } from '../types/Location';

export type SortOption = 
  | 'name-asc'      // По названию (А-Я)
  | 'name-desc'     // По названию (Я-А)
  | 'category-asc'  // По категории (А-Я)
  | 'category-desc' // По категории (Я-А)
  | 'visited-first' // Посещенные сначала
  | 'not-visited-first'; // Не посещенные сначала

interface Props {
  selectedSort: SortOption;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  sortChange: [sort: SortOption];
}>();

const sortOptions = [
  { value: 'name-asc', label: 'По названию (А-Я)', icon: '🔤' },
  { value: 'name-desc', label: 'По названию (Я-А)', icon: '🔤' },
  { value: 'category-asc', label: 'По категории (А-Я)', icon: '📂' },
  { value: 'category-desc', label: 'По категории (Я-А)', icon: '📂' },
  { value: 'visited-first', label: 'Посещенные сначала', icon: '✅' },
  { value: 'not-visited-first', label: 'Не посещенные сначала', icon: '⭕' }
] as const;

const handleSortChange = (sort: SortOption) => {
  emit('sortChange', sort);
};
</script>

<template>
  <div class="sort-options">
    <h3 class="sort-title">Сортировка</h3>
    
    <div class="sort-buttons">
      <button 
        v-for="option in sortOptions"
        :key="option.value"
        class="sort-button"
        :class="{ active: selectedSort === option.value }"
        @click="handleSortChange(option.value)"
      >
        <span class="sort-icon">{{ option.icon }}</span>
        <span class="sort-label">{{ option.label }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.sort-options {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

.sort-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 1rem 0;
  text-align: center;
}

.sort-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
}

.sort-button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  text-align: left;
}

.sort-button:hover {
  border-color: #667eea;
  background: #f8f9ff;
  transform: translateY(-2px);
}

.sort-button.active {
  border-color: #667eea;
  background: #667eea;
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.sort-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.sort-label {
  font-weight: 500;
  line-height: 1.2;
}

@media (max-width: 768px) {
  .sort-options {
    padding: 1rem;
  }
  
  .sort-buttons {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .sort-button {
    padding: 0.75rem;
    font-size: 0.85rem;
  }
  
  .sort-icon {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .sort-button {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
}
</style>
