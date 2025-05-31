<template>
  <div>
    <h1 class="mb-4">Lancements SpaceX</h1>
    <div v-if="nextLaunch && isNextLaunchFuture" class="alert alert-primary">
      <strong>Prochain lancement :</strong>
      {{ nextLaunch.name }} - {{ formatDate(nextLaunch.date_utc) }}
      <span class="badge bg-info ms-3">Décompte : {{ countdown }}s</span>
    </div>
    <div v-else-if="nextLaunch && !isNextLaunchFuture" class="alert alert-warning">
      <strong>Prochain lancement :</strong>
      {{ nextLaunch.name }} - {{ formatDate(nextLaunch.date_utc) }}
      <span class="ms-3 text-danger">Aucun lancement à venir</span>
    </div>
    <div class="mb-3">
      <select v-model="filter" class="form-select w-auto d-inline-block">
        <option value="all">Tous les lancements</option>
        <option value="success">Lancements réussis</option>
        <option value="failed">Lancements échoués</option>
      </select>
    </div>
    <ul class="list-group mb-4">
      <li v-for="launch in filteredLaunches" :key="launch.id"
          class="list-group-item list-group-item-action"
          @click="selectLaunch(launch)"
          style="cursor:pointer">
        {{ launch.name }} - {{ formatDate(launch.date_utc) }}
      </li>
    </ul>
    <LaunchModal v-if="selectedLaunch" :launch="selectedLaunch" @close="selectedLaunch = null" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import LaunchModal from '../components/LaunchModal.vue'

const launches = ref<any[]>([])
const nextLaunch = ref<any>(null)
const filter = ref('all')
const selectedLaunch = ref<any>(null)
const countdown = ref(0)
let countdownInterval: any = null

function formatDate(dateStr: string, full = false) {
  const d = new Date(dateStr)
  return full
    ? d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : d.toLocaleDateString()
}

async function fetchLaunches() {
  const [pastRes, nextRes] = await Promise.all([
    fetch('https://api.spacexdata.com/v5/launches/past?limit=10&order=desc'),
    fetch('https://api.spacexdata.com/v5/launches/next')
  ])
  launches.value = await pastRes.json()
  nextLaunch.value = await nextRes.json()
}

function startCountdown() {
  clearInterval(countdownInterval)
  if (!nextLaunch.value || !nextLaunch.value.date_unix) {
    countdown.value = 0
    return
  }
  const launchDate = nextLaunch.value.date_unix * 1000
  countdown.value = Math.max(0, Math.floor((launchDate - Date.now()) / 1000))
  countdownInterval = setInterval(() => {
    const now = Date.now()
    countdown.value = Math.max(0, Math.floor((launchDate - now) / 1000))
    if (countdown.value <= 0) {
      clearInterval(countdownInterval)
    }
  }, 1000)
}

const isNextLaunchFuture = computed(() => {
  if (!nextLaunch.value || !nextLaunch.value.date_unix) return false
  return nextLaunch.value.date_unix * 1000 > Date.now()
})

watch(nextLaunch, () => {
  startCountdown()
})

const filteredLaunches = computed(() => {
  if (filter.value === 'success') return launches.value.filter(l => l.success)
  if (filter.value === 'failed') return launches.value.filter(l => l.success === false)
  return launches.value
})

async function selectLaunch(launch: any) {
  const [pad, payloads, rocket] = await Promise.all([
    fetch(`https://api.spacexdata.com/v4/launchpads/${launch.launchpad}`).then(r => r.json()),
    Promise.all(launch.payloads.map((id: string) =>
      fetch(`https://api.spacexdata.com/v4/payloads/${id}`).then(r => r.json())
    )),
    fetch(`https://api.spacexdata.com/v4/rockets/${launch.rocket}`).then(r => r.json())
  ])
  selectedLaunch.value = {
    ...launch,
    launchpad_name: pad.name,
    payload_names: payloads.map((p: any) => p.name),
    customer_names: payloads.flatMap((p: any) => p.customers),
    rocket
  }
}

onMounted(fetchLaunches)
</script>
