<script setup lang="ts">
import { ref } from 'vue';
import type { LocationCategory } from '../types/Location';
import CategoryFilter from './CategoryFilter.vue';
import VisitedStatusFilter from './VisitedStatusFilter.vue';
import SearchFilter from './SearchFilter.vue';

interface Props {
  selectedCategory: LocationCategory | null;
  selectedStatus: 'all' | 'visited' | 'not-visited';
  searchQuery: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  categoryChange: [category: LocationCategory | null];
  statusChange: [status: 'all' | 'visited' | 'not-visited'];
  searchChange: [query: string];
  clearAllFilters: [];
}>();

const isExpanded = ref(false);

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value;
};

const handleClearAllFilters = () => {
  emit('categoryChange', null);
  emit('statusChange', 'all');
  emit('searchChange', '');
  emit('clearAllFilters');
};

const hasActiveFilters = () => {
  return props.selectedCategory !== null || 
         props.selectedStatus !== 'all' || 
         props.searchQuery !== '';
};
</script>

<template>
  <div class="filter-panel">
    <!-- Filter Toggle Button -->
    <div class="filter-toggle">
      <button 
        class="toggle-button"
        :class="{ active: hasActiveFilters() }"
        @click="toggleExpanded"
      >
        <span class="toggle-icon">🔍</span>
        <span class="toggle-text">Фильтры</span>
        <span v-if="hasActiveFilters()" class="active-indicator">{{ getActiveFilterCount() }}</span>
        <span class="toggle-arrow" :class="{ expanded: isExpanded }">▼</span>
      </button>
      
      <button 
        v-if="hasActiveFilters()"
        class="clear-all-button"
        @click="handleClearAllFilters"
        title="Очистить все фильтры"
      >
        ✕
      </button>
    </div>

    <!-- Filter Content -->
    <div class="filter-content" :class="{ expanded: isExpanded }">
      <SearchFilter 
        :search-query="searchQuery"
        @search-change="emit('searchChange', $event)"
      />
      
      <CategoryFilter 
        :selected-category="selectedCategory"
        @category-change="emit('categoryChange', $event)"
      />
      
      <VisitedStatusFilter 
        :selected-status="selectedStatus"
        @status-change="emit('statusChange', $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    getActiveFilterCount(): number {
      let count = 0;
      if (this.selectedCategory !== null) count++;
      if (this.selectedStatus !== 'all') count++;
      if (this.searchQuery !== '') count++;
      return count;
    }
  }
};
</script>

<style scoped>
.filter-panel {
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  overflow: hidden;
}

.filter-toggle {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.toggle-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  font-size: 1rem;
  font-weight: 500;
}

.toggle-button:hover {
  border-color: #667eea;
  background: #f8f9ff;
}

.toggle-button.active {
  border-color: #667eea;
  background: #667eea;
  color: white;
}

.toggle-icon {
  font-size: 1.2rem;
}

.toggle-text {
  flex: 1;
  text-align: left;
}

.active-indicator {
  background: #dc3545;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
}

.toggle-arrow {
  font-size: 0.8rem;
  transition: transform 0.3s ease;
}

.toggle-arrow.expanded {
  transform: rotate(180deg);
}

.clear-all-button {
  margin-left: 0.75rem;
  padding: 0.75rem;
  border: 2px solid #dc3545;
  border-radius: 10px;
  background: #dc3545;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: bold;
}

.clear-all-button:hover {
  background: #c82333;
  border-color: #c82333;
  transform: scale(1.05);
}

.filter-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.filter-content.expanded {
  max-height: 2000px;
}

@media (max-width: 768px) {
  .filter-toggle {
    padding: 0.75rem 1rem;
  }
  
  .toggle-button {
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
  }
  
  .clear-all-button {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
}
</style>
