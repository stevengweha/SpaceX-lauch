<template>
  <div class="modal fade show d-block" tabindex="-1" style="background:rgba(0,0,0,0.7)">
    <div class="modal-dialog modal-lg">
      <div class="modal-content bg-dark text-white">
        <div class="modal-header">
          <h5 class="modal-title">{{ launch.name }}</h5>
          <button type="button" class="btn-close btn-close-white" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <p><strong>Date :</strong> {{ formatDate(launch.date_utc, true) }}</p>
          <p v-if="launch.details">{{ launch.details }}</p>
          <img v-if="launch.links.patch.small" :src="launch.links.patch.small" class="mb-2" style="max-width:80px;" />
          <a v-if="launch.links.article" :href="launch.links.article" target="_blank" class="btn btn-link text-info">Article</a>
          <div class="my-2" v-if="launch.links.youtube_id">
            <iframe width="100%" height="315" :src="`https://www.youtube.com/embed/${launch.links.youtube_id}`" frameborder="0" allowfullscreen></iframe>
          </div>
          <div>
            <p><strong>Lieu :</strong> {{ launch.launchpad_name }}</p>
            <p><strong>Payloads :</strong> {{ launch.payload_names.join(', ') }}</p>
            <p><strong>Clients :</strong> {{ launch.customer_names.join(', ') }}</p>
          </div>
          <div v-if="launch.rocket" class="mt-3 p-3 bg-secondary rounded">
            <h6>Fusée : {{ launch.rocket.name }}</h6>
            <img v-if="launch.rocket.flickr_images && launch.rocket.flickr_images.length"
                 :src="launch.rocket.flickr_images[0]"
                 style="max-width:120px;" class="mb-2" />
            <p>{{ launch.rocket.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ launch: any }>()
function formatDate(dateStr: string, full = false) {
  const d = new Date(dateStr)
  return full
    ? d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : d.toLocaleDateString()
}
</script>
