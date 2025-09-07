<script setup lang="ts">
import type { Location } from '../types/Location';
import { CATEGORY_LABELS, COOLNESS_LABELS } from '../config/app';
import PhotoGallery from './PhotoGallery.vue';

interface Props {
  location: Location;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  toggleVisited: [location: Location];
  goBack: [];
}>();

const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    PARK: '🌳',
    ATTRACTION: '🏛️',
    RESTAURANT: '🍽️',
    BEACH: '🏖️',
    MUSEUM: '🏛️',
    SHOPPING: '🛍️',
    NIGHTLIFE: '🌃',
    HOTEL: '🏨',
    OTHER: '📍'
  };
  return icons[category] || '📍';
};

const getCoolnessColor = (rating: string): string => {
  const colors: Record<string, string> = {
    MUST_SEE: '#ff6b6b',
    COOL: '#4ecdc4',
    JUST_OK: '#95a5a6'
  };
  return colors[rating] || '#95a5a6';
};

const openMap = (url: string) => {
  window.open(url, '_blank');
};

const handleToggleVisited = () => {
  emit('toggleVisited', props.location);
};

const handleGoBack = () => {
  emit('goBack');
};
</script>

<template>
  <div class="location-detail">
    <!-- Back button -->
    <div class="detail-header">
      <button class="back-button" @click="handleGoBack">
        ← Назад к списку
      </button>
    </div>

    <div class="location-detail-content">
      <!-- Photo Gallery -->
      <div class="detail-photos">
        <PhotoGallery 
          :photos="location.photos" 
          :location-name="location.name"
        />
      </div>

      <!-- Location Info -->
      <div class="detail-info">
        <!-- Title and Category -->
        <div class="info-header">
          <div class="category-badge">
            <span class="category-icon">{{ getCategoryIcon(location.category) }}</span>
            <span class="category-text">{{ CATEGORY_LABELS[location.category] }}</span>
          </div>
          
          <div 
            v-if="location.coolnessRating" 
            class="coolness-badge"
            :style="{ backgroundColor: getCoolnessColor(location.coolnessRating) }"
          >
            {{ COOLNESS_LABELS[location.coolnessRating] }}
          </div>
        </div>

        <h1 class="location-title">{{ location.name }}</h1>

        <!-- Description -->
        <div class="description-section">
          <h3>Описание</h3>
          <p class="location-description">{{ location.description }}</p>
        </div>

        <!-- Details -->
        <div class="details-section">
          <h3>Информация</h3>
          
          <div class="detail-item" v-if="location.address">
            <span class="detail-icon">📍</span>
            <div class="detail-content">
              <strong>Адрес:</strong>
              <span>{{ location.address }}</span>
            </div>
          </div>

          <div class="detail-item" v-if="location.openingHours">
            <span class="detail-icon">🕒</span>
            <div class="detail-content">
              <strong>Время работы:</strong>
              <span>{{ location.openingHours }}</span>
            </div>
          </div>

          <div class="detail-item">
            <span class="detail-icon">🌍</span>
            <div class="detail-content">
              <strong>Координаты:</strong>
              <span>{{ location.latitude.toFixed(6) }}, {{ location.longitude.toFixed(6) }}</span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="actions-section">
          <button 
            v-if="location.externalMapUrl"
            class="action-button map-button"
            @click="openMap(location.externalMapUrl)"
          >
            🗺️ Открыть на карте
          </button>
          
          <button 
            class="action-button visit-button"
            :class="{ visited: location.visited }"
            @click="handleToggleVisited"
          >
            {{ location.visited ? '✅ Посещено' : '⭕ Отметить как посещенное' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.location-detail {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 100vh;
}

.detail-header {
  margin-bottom: 2rem;
}

.back-button {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.location-detail-content {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.detail-photos {
  padding: 0;
}

.detail-info {
  padding: 2rem;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.category-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8f9fa;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
}

.category-icon {
  font-size: 1.2rem;
}

.coolness-badge {
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.location-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin: 0 0 2rem 0;
  line-height: 1.2;
}

.description-section,
.details-section {
  margin-bottom: 2rem;
}

.description-section h3,
.details-section h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 1rem 0;
  border-bottom: 2px solid #667eea;
  padding-bottom: 0.5rem;
}

.location-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  margin: 0;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.detail-icon {
  font-size: 1.5rem;
  margin-top: 0.25rem;
}

.detail-content {
  flex: 1;
  min-width: 0; /* Allow text to wrap properly */
}

.detail-content strong {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.detail-content span {
  color: #555;
  line-height: 1.5;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.actions-section {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e9ecef;
}

.action-button {
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  min-width: 200px;
}

.map-button {
  background: #667eea;
  color: white;
}

.map-button:hover {
  background: #5a6fd8;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.visit-button {
  background: #e9ecef;
  color: #495057;
  border: 2px solid #dee2e6;
}

.visit-button:hover {
  background: #dee2e6;
  transform: translateY(-2px);
}

.visit-button.visited {
  background: #28a745;
  color: white;
  border-color: #28a745;
}

.visit-button.visited:hover {
  background: #218838;
  border-color: #218838;
}

@media (max-width: 768px) {
  .location-detail {
    padding: 1rem;
  }
  
  .detail-info {
    padding: 1.5rem;
  }
  
  .location-title {
    font-size: 2rem;
  }
  
  .info-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .detail-item {
    padding: 1rem;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .detail-icon {
    margin-top: 0;
  }
  
  .actions-section {
    flex-direction: column;
  }
  
  .action-button {
    min-width: auto;
  }
}
</style>
