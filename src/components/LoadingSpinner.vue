<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  color: '#667eea',
  text: 'Загрузка...'
});

const spinnerSize = computed(() => {
  const sizes = {
    small: '20px',
    medium: '40px',
    large: '60px'
  };
  return sizes[props.size];
});

const textSize = computed(() => {
  const sizes = {
    small: '0.8rem',
    medium: '1rem',
    large: '1.2rem'
  };
  return sizes[props.size];
});
</script>

<template>
  <div class="loading-spinner">
    <div 
      class="spinner"
      :style="{ 
        width: spinnerSize, 
        height: spinnerSize,
        borderColor: `${color} transparent ${color} transparent`
      }"
    ></div>
    <p 
      v-if="text"
      class="loading-text"
      :style="{ fontSize: textSize }"
    >
      {{ text }}
    </p>
  </div>
</template>

<style scoped>
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
}

.spinner {
  border: 3px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  color: #666;
  margin: 0;
  font-weight: 500;
  text-align: center;
}

/* Overlay variant */
.loading-spinner.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  z-index: 1000;
}

/* Dark theme variant */
.loading-spinner.dark {
  background: rgba(0, 0, 0, 0.8);
}

.loading-spinner.dark .loading-text {
  color: white;
}
</style>
