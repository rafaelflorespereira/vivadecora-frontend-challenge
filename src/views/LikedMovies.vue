<template>
  <div class="movies">
    <h1>Filmes curtidos</h1>
    <div v-if="likedMovies.length == 0">
      <div class="movies-empty">
        <img src="../assets/video-camera-vazio.png" alt="empty movies" />
        <h3>Nenhum filme</h3>
      </div>
    </div>
    <MoviePoster
      v-else
      v-for="(movie, index) in likedMovies"
      :key="index"
      :movie="movie"
    />
  </div>
</template>

<script>
import MoviePoster from "../components/MoviePoster";
export default {
  props: ["likedMovies"],
  components: {
    MoviePoster,
  },
};
</script>
