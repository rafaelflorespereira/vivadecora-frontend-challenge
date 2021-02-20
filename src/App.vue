<template>
  <div ref="main" class="app">
    <Navbar @isSidebarOpen="handleSidebar" />
    <transition name="fade" mode="out-in">
      <router-view
        @notLikedMovies="getNotLikedMovies"
        @likedMovies="getLikedMovies"
        :likedMovies="likedMovies"
        :notLikedMovies="notLikedMovies"
      ></router-view>
    </transition>
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
export default {
  components: {
    Navbar,
    Footer,
  },
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
    handleSidebar(event) {
      if (event == true) {
        this.$refs.main.style.marginLeft = "250px";
      } else {
        this.$refs.main.style.marginLeft = "0px";
      }
    },
  },
};
</script>

<style lang="scss">
$color-red-dark: #ff1c1c;
$color-red-light: #ff5656;
* {
  font-family: Trebuchet MS, sans-serif;
  margin: 0;
  padding: 0;
  border: 0;
}
html {
  background-image: linear-gradient(
    to right,
    $color-red-light,
    $color-red-dark
  );
}
/* Animation transitions */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter {
  transform: translateX(100%);
}
.fade-leave-active {
  transform: translateX(-100%);
}
</style>
