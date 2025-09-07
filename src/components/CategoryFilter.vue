<script setup lang="ts">
import type { LocationCategory } from '../types/Location';
import { CATEGORY_LABELS } from '../config/app';

interface Props {
  selectedCategory: LocationCategory | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  categoryChange: [category: LocationCategory | null];
}>();

const categories: LocationCategory[] = [
  'PARK',
  'ATTRACTION', 
  'RESTAURANT',
  'BEACH',
  'MUSEUM',
  'SHOPPING',
  'NIGHTLIFE',
  'HOTEL',
  'ENTERTAINMENT',
  'DESSERT',
  'CAFE',
  'OTHER'
];

const getCategoryIcon = (category: LocationCategory): string => {
  const icons: Record<LocationCategory, string> = {
    PARK: '🌳',
    ATTRACTION: '🏛️',
    RESTAURANT: '🍽️',
    BEACH: '🏖️',
    MUSEUM: '🏛️',
    SHOPPING: '🛍️',
    NIGHTLIFE: '🌃',
    HOTEL: '🏨',
    ENTERTAINMENT: '🎪',
    DESSERT: '🍰',
    CAFE: '☕',
    OTHER: '📍'
  };
  return icons[category];
};

const handleCategorySelect = (category: LocationCategory | null) => {
  emit('categoryChange', category);
};
</script>

<template>
  <div class="category-filter">
    <h3 class="filter-title">Категории</h3>
    
    <div class="category-options">
      <button 
        class="category-option"
        :class="{ active: selectedCategory === null }"
        @click="handleCategorySelect(null)"
      >
        <span class="category-icon">📍</span>
        <span class="category-label">Все</span>
      </button>
      
      <button 
        v-for="category in categories"
        :key="category"
        class="category-option"
        :class="{ active: selectedCategory === category }"
        @click="handleCategorySelect(category)"
      >
        <span class="category-icon">{{ getCategoryIcon(category) }}</span>
        <span class="category-label">{{ CATEGORY_LABELS[category] }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.category-filter {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

.filter-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 1rem 0;
  text-align: center;
}

.category-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.75rem;
}

.category-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.category-option:hover {
  border-color: #667eea;
  background: #f8f9ff;
  transform: translateY(-2px);
}

.category-option.active {
  border-color: #667eea;
  background: #667eea;
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.category-icon {
  font-size: 1.5rem;
}

.category-label {
  font-weight: 500;
  text-align: center;
  line-height: 1.2;
}

@media (max-width: 768px) {
  .category-filter {
    padding: 1rem;
  }
  
  .category-options {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 0.5rem;
  }
  
  .category-option {
    padding: 0.75rem 0.25rem;
    font-size: 0.8rem;
  }
  
  .category-icon {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .category-options {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
