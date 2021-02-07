<template>
  <div class="home">
    <h1>Tela de filme nao curados</h1>
    <router-link to="liked-movies">Filmes Curtidos</router-link>
    <router-link to="not-liked-movies">Filmes Nao Curtidos</router-link>
    <button @click="getMovie">get movie</button>
    {{ movie }}
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
  data: () => {
    return {
      apiKey: "1beb9b16669a6131e1ea97eb6eb4f883",
      movie: {
        title: "",
        coverPhoto: "",
        year: "",
        genres: [],
        rating: "",
        synopsis: "",
      },
    };
  },
  methods: {
    getMovie() {
      let movieNumber = 550; //total 620,936
      axios
        .get(
          "https://api.themoviedb.org/3/movie/" +
            movieNumber +
            "?api_key=" +
            this.apiKey
        )
        .then((response) => {
          console.log(response.data);
          var movieResponse = response.data;
          this.movie.title = movieResponse.title;
          this.movie.coverPhoto =
            "https://image.tmdb.org/t/p/w500/" + movieResponse.poster_path;
          this.movie.year = movieResponse.release_date;
          // Genre always return in array
          movieResponse.genres.map((genre) =>
            this.movie.genres.push(genre.name)
          );
          this.movie.rating = movieResponse.vote_average;
          this.movie.synopsis = movieResponse.overview;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
