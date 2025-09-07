<script setup lang="ts">
import type { Location } from '../types/Location';
import { CATEGORY_LABELS, COOLNESS_LABELS } from '../config/app';

interface Props {
  location: Location;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  toggleVisited: [location: Location];
  viewDetails: [location: Location];
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

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  if (target) {
    target.src = '';
  }
};

const openMap = (url: string) => {
  window.open(url, '_blank');
};

const handleViewDetails = () => {
  emit('viewDetails', props.location);
};

const handleToggleVisited = (event: Event) => {
  event.stopPropagation(); // Prevent card click when clicking button
  emit('toggleVisited', props.location);
};
</script>

<template>
  <div class="location-card" @click="handleViewDetails">
    <div class="card-image">
      <img 
        :src="location.photos[0]" 
        :alt="location.name"
        @error="handleImageError"
      />
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
    
    <div class="card-content">
      <h3 class="location-name">{{ location.name }}</h3>
      <p class="location-description">{{ location.description }}</p>
      
      <div class="location-details">
        <div v-if="location.address" class="detail-item">
          <span class="detail-icon">📍</span>
          <span class="detail-text">{{ location.address }}</span>
        </div>
        
        <div v-if="location.openingHours" class="detail-item">
          <span class="detail-icon">🕒</span>
          <span class="detail-text">{{ location.openingHours }}</span>
        </div>
      </div>
      
      <div class="card-actions">
        <button 
          v-if="location.externalMapUrl"
          class="map-button"
          @click.stop="openMap(location.externalMapUrl)"
        >
          🗺️ На карте
        </button>
        <button 
          class="visit-button"
          :class="{ visited: location.visited }"
          @click="handleToggleVisited"
        >
          {{ location.visited ? '✅ Посещено' : '⭕ Не посещено' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.location-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 1.5rem;
  cursor: pointer;
}

.location-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.location-card:hover .card-image img {
  transform: scale(1.05);
}

.category-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(255, 255, 255, 0.95);
  padding: 5px 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
}

.category-icon {
  font-size: 1rem;
}

.coolness-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.card-content {
  padding: 1.5rem;
}

.location-name {
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
  margin: 0 0 0.8rem 0;
  line-height: 1.3;
}

.location-description {
  color: #666;
  line-height: 1.5;
  margin: 0 0 1rem 0;
  font-size: 0.95rem;
}

.location-details {
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #555;
}

.detail-icon {
  font-size: 1rem;
  margin-top: 2px;
}

.detail-text {
  flex: 1;
  line-height: 1.4;
}

.card-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.map-button,
.visit-button {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  min-width: 120px;
}

.map-button {
  background: #667eea;
  color: white;
}

.map-button:hover {
  background: #5a6fd8;
  transform: translateY(-2px);
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
  .card-content {
    padding: 1rem;
  }
  
  .location-name {
    font-size: 1.1rem;
  }
  
  .card-actions {
    flex-direction: column;
  }
  
  .map-button,
  .visit-button {
    min-width: auto;
  }
}
</style>
