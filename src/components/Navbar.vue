<template>
  <div>
    <div id="nav" class="nav">
      <img src="../assets/logo-viva-decora.png" alt="logo" class="nav__logo" />
      <img
        src="../assets/menu-lateral.png"
        alt="menu-lateral"
        class="nav__side-menu"
        @click="handleSidebar"
      />
      <router-link class="nav__link" :to="urls.home"
        >Filmes não curados</router-link
      >
      <router-link class="nav__link" :to="urls.likedMovies"
        >Filmes Curtidos</router-link
      >
      <router-link class="nav__link" :to="urls.notLikedMovies"
        >Filmes Não Curtidos</router-link
      >
      <!-- //todo transformar esses links em um soh com os de cima -->
      <div ref="sidebar" class="sidebar">
        <a class="sidebar__link" @click="toRoute(urls.home)"
          >Filmes Não curados</a
        >
        <a class="sidebar__link" @click="toRoute(urls.likedMovies)"
          >Filmes Curtidos</a
        >
        <a class="sidebar__link" @click="toRoute(urls.notLikedMovies)"
          >Filmes Não Curtidos</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      sidebar: false,
      urls: {
        home: "/",
        likedMovies: "liked-movies",
        notLikedMovies: "not-liked-movies",
      },
    };
  },
  methods: {
    handleSidebar() {
      if (this.sidebar == false) {
        this.$refs.sidebar.style.width = "250px";
        this.$emit("isSidebarOpen", true);
      } else {
        this.$refs.sidebar.style.width = "0";
        this.$emit("isSidebarOpen", false);
      }
      this.sidebar = !this.sidebar;
    },
    toRoute(route) {
      this.$router.push(route);
      this.handleSidebar();
    },
  },
};
</script>

<style lang="scss">
$color-red-dark: #ff1c1c;
$color-red-light: #ff5656;
.nav {
  position: relative;
  display: block;
  z-index: 2;
  padding: 2rem;

  text-align: center;
  background-image: linear-gradient(
    to right,
    rgba($color-red-light, 0.2),
    rgba($color-red-dark, 0.2)
  );

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
    @media (max-width: 320px) {
      display: none;
      visibility: hidden;
    }
  }
  &__link.router-link-exact-active {
    border-bottom: 2px solid white;
  }
  &__side-menu {
    position: absolute;
    top: 2rem;
    left: 1.4rem;
    display: none;
    visibility: hidden;
    @media (max-width: 320px) {
      display: block;
      visibility: visible;
    }
    &:hover {
      cursor: pointer;
    }
  }
}
.sidebar {
  height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  top: 0;
  left: 0;
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidebar */
  background: rgb(56, 56, 56);
  z-index: 999;
  &__link {
    display: block;
    color: white;
    font-size: 1.4rem;
    align-content: center;
    padding: 1rem;
  }
}
</style>
