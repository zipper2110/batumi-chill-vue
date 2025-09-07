<script setup lang="ts">
import { ref, computed } from 'vue';

interface Props {
  photos: string[];
  locationName: string;
}

const props = defineProps<Props>();

const currentPhotoIndex = ref(0);

const currentPhoto = computed(() => props.photos[currentPhotoIndex.value]);

const hasMultiplePhotos = computed(() => props.photos.length > 1);

const nextPhoto = () => {
  if (currentPhotoIndex.value < props.photos.length - 1) {
    currentPhotoIndex.value++;
  } else {
    currentPhotoIndex.value = 0;
  }
};

const prevPhoto = () => {
  if (currentPhotoIndex.value > 0) {
    currentPhotoIndex.value--;
  } else {
    currentPhotoIndex.value = props.photos.length - 1;
  }
};

const goToPhoto = (index: number) => {
  currentPhotoIndex.value = index;
};

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  if (target) {
    target.src = '';
  }
};
</script>

<template>
  <div class="photo-gallery">
    <div class="main-photo">
      <img 
        :src="currentPhoto" 
        :alt="locationName"
        @error="handleImageError"
        class="gallery-image"
      />
      
      <!-- Navigation arrows for multiple photos -->
      <div v-if="hasMultiplePhotos" class="photo-navigation">
        <button 
          class="nav-button prev-button"
          @click="prevPhoto"
          aria-label="Предыдущее фото"
        >
          ‹
        </button>
        <button 
          class="nav-button next-button"
          @click="nextPhoto"
          aria-label="Следующее фото"
        >
          ›
        </button>
      </div>
      
      <!-- Photo counter -->
      <div v-if="hasMultiplePhotos" class="photo-counter">
        {{ currentPhotoIndex + 1 }} / {{ photos.length }}
      </div>
    </div>
    
    <!-- Thumbnail navigation -->
    <div v-if="hasMultiplePhotos" class="thumbnails">
      <button
        v-for="(photo, index) in photos"
        :key="index"
        class="thumbnail"
        :class="{ active: index === currentPhotoIndex }"
        @click="goToPhoto(index)"
      >
        <img 
          :src="photo" 
          :alt="`${locationName} - фото ${index + 1}`"
          @error="handleImageError"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
.photo-gallery {
  width: 100%;
}

.main-photo {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.main-photo:hover .gallery-image {
  transform: scale(1.02);
}

.photo-navigation {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  transform: translateY(-50%);
  pointer-events: none;
}

.nav-button {
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: auto;
}

.nav-button:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}

.photo-counter {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.thumbnails {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.5rem 0;
}

.thumbnail {
  flex-shrink: 0;
  width: 80px;
  height: 60px;
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  background: none;
  padding: 0;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail:hover {
  border-color: rgba(102, 126, 234, 0.5);
  transform: scale(1.05);
}

.thumbnail.active {
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.3);
}

@media (max-width: 768px) {
  .main-photo {
    height: 250px;
  }
  
  .nav-button {
    width: 35px;
    height: 35px;
    font-size: 1.2rem;
  }
  
  .thumbnail {
    width: 60px;
    height: 45px;
  }
}
</style>
