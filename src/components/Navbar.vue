<template>
  <div id="nav" class="nav">
    <img src="../assets/logo-viva-decora.png" alt="logo" class="nav__logo" />
    <router-link class="nav__link" to="/">Filmes nao curados</router-link>
    <router-link class="nav__link" to="liked-movies"
      >Filmes Curtidos</router-link
    >
    <router-link class="nav__link" to="not-liked-movies"
      >Filmes Nao Curtidos</router-link
    >
  </div>
</template>

<style lang="scss">
$color-red-dark: #ff1c1c;
$color-red-light: #ff5656;
.nav {
  position: relative;
  display: block;
  z-index: 2;
  padding: 2rem;

  height: 12vh;
  width: 100%;
  background-image: linear-gradient(
    to right,
    rgba($color-red-light, 0.2),
    rgba($color-red-dark, 0.2)
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
