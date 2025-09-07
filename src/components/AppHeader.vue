<script setup lang="ts">
// Header component for Batumi Guide
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
          <span class="stat-item">
            <span class="stat-icon">📍</span>
            <span class="stat-text">Места</span>
          </span>
          <span class="stat-item">
            <span class="stat-icon">✅</span>
            <span class="stat-text">Посещено</span>
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
  padding: 1.5rem 0;
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
  font-size: 2rem;
  margin: 0;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.app-subtitle {
  font-size: 1rem;
  margin: 0.25rem 0 0 0;
  color: rgba(255, 255, 255, 0.9);
}

.header-nav {
  display: flex;
  align-items: center;
}

.nav-stats {
  display: flex;
  gap: 1.5rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-icon {
  font-size: 1.2rem;
}

.stat-text {
  font-size: 0.9rem;
  font-weight: 500;
  color: white;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .app-title {
    font-size: 1.5rem;
  }
  
  .nav-stats {
    gap: 1rem;
  }
  
  .stat-item {
    padding: 0.4rem 0.8rem;
  }
  
  .stat-text {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .nav-stats {
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }
  
  .stat-item {
    justify-content: center;
  }
}
</style>
