<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Location } from './types/Location';
import { locations } from './data/locations';
import AppHeader from './components/AppHeader.vue';
import LocationList from './components/LocationList.vue';

// Состояние приложения
const allLocations = ref<Location[]>(locations);
const visitedCount = computed(() => 
  allLocations.value.filter(location => location.visited).length
);

// Обработчик переключения статуса посещения
const toggleVisited = (location: Location) => {
  const index = allLocations.value.findIndex(loc => loc.name === location.name);
  if (index !== -1) {
    allLocations.value[index].visited = !allLocations.value[index].visited;
  }
};
</script>

<template>
  <div class="app">
    <AppHeader />
    
    <main class="main">
      <LocationList 
        :locations="allLocations"
        @toggle-visited="toggleVisited"
      />
    </main>
    
    <footer class="footer">
      <p>Создано с ❤️ для любителей Батуми</p>
    </footer>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.main {
  flex: 1;
  padding: 0;
}

.footer {
  text-align: center;
  padding: 2rem 1rem;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}

.footer p {
  margin: 0;
  opacity: 0.8;
}
</style>
