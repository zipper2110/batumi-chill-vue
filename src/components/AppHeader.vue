<script setup lang="ts">
interface Props {
  totalCount: number;
  visitedCount: number;
}

defineProps<Props>();
</script>

<template>
  <header class="app-header">
    <div class="header-content">
      <div class="logo">
        <h1 class="app-title">🏖️ Батуми Гид</h1>
        <p class="app-subtitle">Откройте для себя красоты Батуми</p>
      </div>
      
      <nav class="header-nav">
        <div class="nav-stats">
          <span class="stat-item combined-stats">
            <span class="stat-icon">📍</span>
            <span class="stat-text">{{ totalCount }} мест</span>
            <span class="stat-separator">•</span>
            <span class="stat-icon">✅</span>
            <span class="stat-text">{{ visitedCount }} посещено</span>
            <span class="stat-separator">•</span>
            <span class="stat-icon">📊</span>
            <span class="stat-text">{{ Math.round((visitedCount / totalCount) * 100) }}%</span>
          </span>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.75rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  text-align: left;
}

.app-title {
  font-size: 1.5rem;
  margin: 0;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.app-subtitle {
  font-size: 0.85rem;
  margin: 0.15rem 0 0 0;
  color: rgba(255, 255, 255, 0.9);
}

.header-nav {
  display: flex;
  align-items: center;
}

.nav-stats {
  display: flex;
  gap: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-icon {
  font-size: 1rem;
}

.stat-text {
  font-size: 0.8rem;
  font-weight: 500;
  color: white;
}

.progress-item {
  background: rgba(40, 167, 69, 0.2);
  border-color: rgba(40, 167, 69, 0.3);
}

.combined-stats {
  background: rgba(40, 167, 69, 0.15);
  border-color: rgba(40, 167, 69, 0.25);
}

.stat-separator {
  color: rgba(255, 255, 255, 0.6);
  font-weight: bold;
  margin: 0 0.3rem;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }
  
  .app-title {
    font-size: 1.3rem;
  }
  
  .app-subtitle {
    font-size: 0.8rem;
  }
  
  .nav-stats {
    gap: 0.75rem;
  }
  
  .stat-item {
    padding: 0.35rem 0.7rem;
  }
  
  .stat-text {
    font-size: 0.75rem;
  }
  
  .stat-separator {
    margin: 0 0.2rem;
  }
}

@media (max-width: 480px) {
  .nav-stats {
    flex-direction: column;
    gap: 0.4rem;
    width: 100%;
  }
  
  .stat-item {
    justify-content: center;
    padding: 0.3rem 0.6rem;
  }
  
  .stat-separator {
    margin: 0 0.15rem;
  }
  
  .stat-text {
    font-size: 0.7rem;
  }
}
</style>
