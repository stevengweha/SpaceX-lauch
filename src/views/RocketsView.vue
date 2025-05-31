<template>
  <div>
    <h1 class="mb-4">Fusées SpaceX</h1>
    <div class="row">
      <div v-for="rocket in rockets" :key="rocket.id" class="col-md-4 mb-4">
        <div class="card h-100" @click="selectRocket(rocket)" style="cursor:pointer">
          <img v-if="rocket.flickr_images && rocket.flickr_images.length"
               :src="rocket.flickr_images[0]"
               class="card-img-top" :alt="rocket.name" style="max-height:200px;object-fit:contain;">
          <div class="card-body">
            <h5 class="card-title">{{ rocket.name }}</h5>
            <p class="card-text">{{ rocket.description.slice(0, 120) }}...</p>
          </div>
        </div>
      </div>
    </div>
    <RocketModal v-if="selectedRocket" :rocket="selectedRocket" @close="selectedRocket = null" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import RocketModal from '../components/RocketModal.vue'

const rockets = ref<any[]>([])
const selectedRocket = ref<any>(null)

async function fetchRockets() {
  const res = await fetch('https://api.spacexdata.com/v4/rockets')
  rockets.value = await res.json()
}

function selectRocket(rocket: any) {
  selectedRocket.value = rocket
}

onMounted(fetchRockets)
</script>
