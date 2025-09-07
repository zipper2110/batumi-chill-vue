<script setup lang="ts">
interface Props {
  selectedStatus: 'all' | 'visited' | 'not-visited';
}

const props = defineProps<Props>();

const emit = defineEmits<{
  statusChange: [status: 'all' | 'visited' | 'not-visited'];
}>();

const statusOptions = [
  { value: 'all', label: 'Все места', icon: '📍' },
  { value: 'visited', label: 'Посещенные', icon: '✅' },
  { value: 'not-visited', label: 'Не посещенные', icon: '⭕' }
] as const;

const handleStatusSelect = (status: 'all' | 'visited' | 'not-visited') => {
  emit('statusChange', status);
};
</script>

<template>
  <div class="visited-filter">
    <h3 class="filter-title">Статус посещения</h3>
    
    <div class="status-options">
      <button 
        v-for="option in statusOptions"
        :key="option.value"
        class="status-option"
        :class="{ active: selectedStatus === option.value }"
        @click="handleStatusSelect(option.value)"
      >
        <span class="status-icon">{{ option.icon }}</span>
        <span class="status-label">{{ option.label }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.visited-filter {
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

.status-options {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.status-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  max-width: 150px;
}

.status-option:hover {
  border-color: #667eea;
  background: #f8f9ff;
  transform: translateY(-2px);
}

.status-option.active {
  border-color: #667eea;
  background: #667eea;
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.status-icon {
  font-size: 1.5rem;
}

.status-label {
  font-weight: 500;
  text-align: center;
  font-size: 0.9rem;
  line-height: 1.2;
}

@media (max-width: 768px) {
  .visited-filter {
    padding: 1rem;
  }
  
  .status-options {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .status-option {
    max-width: none;
    padding: 0.75rem 1rem;
    flex-direction: row;
    justify-content: center;
    gap: 0.75rem;
  }
  
  .status-icon {
    font-size: 1.2rem;
  }
  
  .status-label {
    font-size: 0.85rem;
  }
}
</style>
