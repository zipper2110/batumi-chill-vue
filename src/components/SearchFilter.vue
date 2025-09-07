<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
  searchQuery: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  searchChange: [query: string];
}>();

const localQuery = ref(props.searchQuery);

// Debounce search input
let searchTimeout: number | null = null;

const handleSearchInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  localQuery.value = target.value;
  
  // Clear existing timeout
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  
  // Set new timeout for debounced search
  searchTimeout = setTimeout(() => {
    emit('searchChange', localQuery.value);
  }, 300);
};

const clearSearch = () => {
  localQuery.value = '';
  emit('searchChange', '');
};

// Watch for external changes to search query
watch(() => props.searchQuery, (newQuery) => {
  localQuery.value = newQuery;
});
</script>

<template>
  <div class="search-filter">
    <h3 class="filter-title">Поиск</h3>
    
    <div class="search-container">
      <div class="search-input-wrapper">
        <span class="search-icon">🔍</span>
        <input
          type="text"
          :value="localQuery"
          @input="handleSearchInput"
          placeholder="Поиск по названию или описанию..."
          class="search-input"
        />
        <button 
          v-if="localQuery"
          @click="clearSearch"
          class="clear-button"
          aria-label="Очистить поиск"
        >
          ✕
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-filter {
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

.search-container {
  display: flex;
  justify-content: center;
}

.search-input-wrapper {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: #666;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.search-input::placeholder {
  color: #999;
}

.clear-button {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;
  transition: all 0.3s ease;
}

.clear-button:hover {
  background: #c82333;
  transform: translateY(-50%) scale(1.1);
}

@media (max-width: 768px) {
  .search-filter {
    padding: 1rem;
  }
  
  .search-input {
    padding: 0.75rem 0.75rem 0.75rem 2.5rem;
    font-size: 0.9rem;
  }
  
  .search-icon {
    left: 0.75rem;
    font-size: 1rem;
  }
  
  .clear-button {
    right: 0.75rem;
    width: 20px;
    height: 20px;
    font-size: 0.7rem;
  }
}
</style>
