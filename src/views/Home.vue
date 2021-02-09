<template>
  <div class="home">
    <img
      :src="movie.backdrop"
      alt="movie-background"
      class="home__background-image"
    />
    <div class="card">
      <div
        class="card__background-image"
        :style="{
          backgroundImage: `linear-gradient(transparent, rgba(255,255,255,0.5)), url(${movie.backdrop})`,
        }"
      ></div>
      <div class="card__bottom">
        <h3 class="card__bottom-heading">{{ movie.title }}</h3>
        <p class="card__bottom-subheading">
          <span class="u-margin-right-small">{{ treatedYear }}</span>
          <span class="u-margin-right-small">{{ treatedGenres }}</span>
        </p>
        <p class="card__bottom-description">
          {{ treatedSynopsys }}
        </p>
        <span> <a href="#" class="card__bottom-link"> Synopsis</a></span>
        <div class="card__bottom-rating">
          <span v-for="rating in 5" :key="rating">
            <img
              v-if="rating < treatedRating"
              src="..\assets\favorite.png"
              alt=""
            />
            <img v-else src="..\assets\favorite_.png" alt="" />
          </span>
          <div>
            {{ treatedRatingText }}
          </div>
        </div>
      </div>
    </div>

    <button class="btn" @click="getMovie">
      pular
    </button>
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
        poster: "",
        backdrop: "",
        year: "",
        genres: [],
        rating: "",
        synopsis: "",
        voteCount: 0,
      },
    };
  },
  methods: {
    getMovie() {
      let movieNumber = Math.floor(620936 * Math.random()); //total 620,936
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
          if (movieResponse.poster_path != null) {
            this.movie.poster =
              "https://image.tmdb.org/t/p/original" + movieResponse.poster_path;
          }
          if (movieResponse.backdrop_path != null) {
            this.movie.backdrop =
              "https://image.tmdb.org/t/p/original" +
              movieResponse.backdrop_path;
          } else {
            this.movie.backdrop = require("../assets/video-camera-vazio.png");
          }
          this.movie.year = movieResponse.release_date;
          // Genre always return in array
          var genres = [];
          movieResponse.genres.map((genre) => genres.push(genre.name));
          this.movie.genres = genres;
          this.movie.rating = movieResponse.vote_average;
          this.movie.synopsis = movieResponse.overview;
          this.movie.voteCount = response.data.vote_count;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    treatedYear() {
      return this.movie.year.slice(0, 4);
    },
    treatedGenres() {
      return this.movie.genres.join("/");
    },
    treatedRating() {
      return Math.floor(this.movie.rating / 2);
    },
    treatedSynopsys() {
      return this.movie.synopsis.slice(0, 100) + "...";
    },
    treatedRatingText() {
      return `( ${this.movie.voteCount} avaliações )`;
    },
  },
};
</script>

<style lang="scss">
$color-red-dark: #ff1c1c;
$color-red-light: #ff5656;
.home {
  position: relative;
  &__background-image {
    width: 100%;
    height: 70vh;
    object-fit: cover;
    opacity: 0.2;
  }
}
.card {
  position: absolute;
  display: block;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 50vh;
  width: 60vw;
  &__background-image {
    border-radius: 5px;
    background-size: cover;
    overflow: hidden;
    top: 0;
    width: 100%;
    height: 100%;
  }
  &__bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    color: white;
    font-family: Tahoma, sans-serif;
    margin-bottom: 1rem;
    &-heading {
      padding: 0 2rem;
      width: 50%;
      margin: 0.2rem 0;
      font-size: 1.4rem;
      font-weight: 800;
    }
    &-subheading {
      text-transform: uppercase;
      padding: 0 2rem;
      font-size: 0.8rem;
    }
    &-description {
      display: inline-block;
      padding: 0 2rem;
      font-size: 0.8rem;
    }
    &-rating {
      & span {
        content: " ";
      }
      display: inline;
      position: absolute;
      top: 0;
      right: 0;
      margin-right: 4rem;
    }
    &-link {
      color: $color-red-dark;
    }
  }
}
.u-margin-right-small {
  margin-right: 0.4rem;
}
.btn {
  position: relative;
}
</style>
