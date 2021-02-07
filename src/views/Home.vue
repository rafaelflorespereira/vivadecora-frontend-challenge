<template>
  <div class="home">
    <h1>Tela de filme nao curados</h1>
    <router-link to="liked-movies">Filmes Curtidos</router-link>
    <router-link to="not-liked-movies">Filmes Nao Curtidos</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src

export default {};
</script>
