<template>
  <div class="app">
    <div id="nav" class="nav">
      <router-link to="/">Filmes nao curados</router-link>
      <router-link to="liked-movies">Filmes Curtidos</router-link>
      <router-link to="not-liked-movies">Filmes Nao Curtidos</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="sass">
.app {
  padding: 0
}
</style>
