<template>
  <div class="modal fade show d-block" tabindex="-1" style="background:rgba(0,0,0,0.7)">
    <div class="modal-dialog modal-lg">
      <div class="modal-content bg-dark text-white">
        <div class="modal-header">
          <h5 class="modal-title">{{ rocket.name }}</h5>
          <button type="button" class="btn-close btn-close-white" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <img v-if="rocket.flickr_images && rocket.flickr_images.length"
               :src="rocket.flickr_images[0]"
               style="max-width:300px;" class="mb-3" />
          <p>{{ rocket.description }}</p>
          <ul class="list-group list-group-flush bg-dark">
            <li class="list-group-item bg-dark text-white"><strong>Hauteur :</strong> {{ rocket.height.meters }} m</li>
            <li class="list-group-item bg-dark text-white"><strong>Diamètre :</strong> {{ rocket.diameter.meters }} m</li>
            <li class="list-group-item bg-dark text-white"><strong>Masse :</strong> {{ rocket.mass.kg }} kg</li>
            <li class="list-group-item bg-dark text-white"><strong>Nombre d'étages :</strong> {{ rocket.stages }}</li>
            <li class="list-group-item bg-dark text-white"><strong>Première utilisation :</strong> {{ rocket.first_flight }}</li>
            <li class="list-group-item bg-dark text-white"><strong>Pays :</strong> {{ rocket.country }}</li>
            <li class="list-group-item bg-dark text-white"><strong>Entreprise :</strong> {{ rocket.company }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ rocket: any }>()
</script>
