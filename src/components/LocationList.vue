<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Location } from '../types/Location';
import LocationCard from './LocationCard.vue';

interface Props {
  locations: Location[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  toggleVisited: [location: Location];
}>();

const toggleVisited = (location: Location) => {
  emit('toggleVisited', location);
};
</script>

<template>
  <div class="location-list">
    <div class="list-header">
      <h2>Места в Батуми</h2>
      <p class="list-subtitle">
        Найдено {{ locations.length }} мест для изучения
      </p>
    </div>
    
    <div class="locations-grid">
      <LocationCard
        v-for="location in locations"
        :key="location.name"
        :location="location"
        @toggle-visited="toggleVisited"
      />
    </div>
    
    <div v-if="locations.length === 0" class="empty-state">
      <div class="empty-icon">📍</div>
      <h3>Места не найдены</h3>
      <p>Попробуйте изменить фильтры поиска</p>
    </div>
  </div>
</template>

<style scoped>
.location-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.list-header {
  text-align: center;
  margin-bottom: 3rem;
}

.list-header h2 {
  font-size: 2.5rem;
  color: white;
  margin: 0 0 0.5rem 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.list-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

.locations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: white;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.7;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
  color: white;
}

.empty-state p {
  font-size: 1rem;
  opacity: 0.8;
  margin: 0;
}

@media (max-width: 768px) {
  .location-list {
    padding: 1rem;
  }
  
  .list-header h2 {
    font-size: 2rem;
  }
  
  .locations-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .locations-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
