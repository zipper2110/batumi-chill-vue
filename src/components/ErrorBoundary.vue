<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue';

interface Props {
  fallback?: string;
  showRetry?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  fallback: 'Произошла ошибка при загрузке данных',
  showRetry: true
});

const emit = defineEmits<{
  retry: [];
}>();

const hasError = ref(false);
const errorMessage = ref('');

onErrorCaptured((error) => {
  hasError.value = true;
  errorMessage.value = error.message || props.fallback;
  console.error('Error caught by ErrorBoundary:', error);
  return false; // Prevent error from propagating
});

const handleRetry = () => {
  hasError.value = false;
  errorMessage.value = '';
  emit('retry');
};
</script>

<template>
  <div v-if="hasError" class="error-boundary">
    <div class="error-content">
      <div class="error-icon">⚠️</div>
      <h3 class="error-title">Ошибка</h3>
      <p class="error-message">{{ errorMessage }}</p>
      
      <button 
        v-if="showRetry"
        @click="handleRetry"
        class="retry-button"
      >
        🔄 Попробовать снова
      </button>
    </div>
  </div>
  
  <slot v-else />
</template>

<style scoped>
.error-boundary {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 2rem;
}

.error-content {
  text-align: center;
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.error-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #dc3545;
  margin: 0 0 1rem 0;
}

.error-message {
  color: #666;
  line-height: 1.5;
  margin: 0 0 1.5rem 0;
}

.retry-button {
  background: #667eea;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-button:hover {
  background: #5a6fd8;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

@media (max-width: 768px) {
  .error-boundary {
    padding: 1rem;
  }
  
  .error-content {
    padding: 1.5rem;
  }
  
  .error-icon {
    font-size: 2.5rem;
  }
  
  .error-title {
    font-size: 1.3rem;
  }
}
</style>
