<template>
  <div class="movies">
    <h1>Filmes não curtidos</h1>
    <div v-if="notLikedMovies.length == 0">
      <div class="movies-empty">
        <img src="../assets/video-camera-vazio.png" alt="empty movies" />
        <h3>Nenhum filme</h3>
      </div>
    </div>
    <MoviePoster
      v-else
      v-for="(movie, index) in notLikedMovies"
      :key="index"
      :movie="movie"
    />
  </div>
</template>

<script>
import MoviePoster from "../components/MoviePoster";
export default {
  props: ["notLikedMovies"],
  components: {
    MoviePoster,
  },
};
</script>
