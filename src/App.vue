<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div class="container">
        <a class="navbar-brand" href="#">SpaceX Explorer</a>
        <div>
          <router-link class="nav-link d-inline text-white" to="/">Lancements</router-link>
          <router-link class="nav-link d-inline text-white" to="/rockets">Fusées</router-link>
        </div>
      </div>
    </nav>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
// ...rien à ajouter ici...
</script>

<style>
body {
  background: #181a1b;
  color: #fff;
}
</style>
