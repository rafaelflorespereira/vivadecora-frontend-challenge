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

export default {
  data: () => {
    return {
      apiKey: "1beb9b16669a6131e1ea97eb6eb4f883",
      movie: {
        title: "",
        coverPhoto: "",
        year: "",
        category: "",
      },
    };
  },
};
</script>
