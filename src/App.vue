<template>
  <div class="app">
    <div id="nav" class="nav">
      <img src="./assets\logo-viva-decora.png" alt="logo" class="nav__logo" />
      <router-link class="nav__link" to="/">Filmes nao curados</router-link>
      <router-link class="nav__link" to="liked-movies"
        >Filmes Curtidos</router-link
      >
      <router-link class="nav__link" to="not-liked-movies"
        >Filmes Nao Curtidos</router-link
      >
    </div>
    <router-view
      @notLikedMovies="getNotLikedMovies"
      @likedMovies="getLikedMovies"
      :likedMovies="likedMovies"
      :notLikedMovies="notLikedMovies"
    ></router-view>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      likedMovies: [],
      notLikedMovies: [],
    };
  },
  methods: {
    getLikedMovies(movie) {
      this.likedMovies.push(movie);
    },
    getNotLikedMovies(movie) {
      this.notLikedMovies.push(movie);
    },
  },
};
</script>

<style lang="scss">
$color-red-dark: #ff1c1c;
$color-red-light: #ff5656;
html {
  padding: 0;
  background-image: linear-gradient(
    to right,
    $color-red-light,
    $color-red-dark
  );
}
.nav {
  position: relative;
  padding: 2rem;
  height: 12vh;
  width: 100%;

  background-image: linear-gradient(
    to right,
    $color-red-light,
    $color-red-dark
  );
  text-align: center;
  &__logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 3rem;
  }
  &__link,
  &__link:visited,
  &__link:link {
    font-family: Verdana, sans-serif;
    color: white;
    text-decoration: none;
    margin: 0 2rem;
    font-size: 1rem;
    text-transform: uppercase;
  }
  &__link.router-link-exact-active {
    border-bottom: 2px solid white;
  }
}
</style>
