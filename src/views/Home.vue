<template>
  <div class="home">
    <img
      :src="movie.backdrop"
      alt="movie-background"
      class="home__background-image"
    />
    <!-- //TODO: Transform this into a component -->
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
          <span class="u-margin-right-small">{{ treatedMovie.year }}</span>
          <span class="u-margin-right-small">{{ treatedMovie.genres }}</span>
        </p>
        <p class="card__bottom-description">
          {{ treatedMovie.treatedSynopsis }}
        </p>
        <span> <a href="#" class="card__bottom-link"> Synopsis</a></span>
        <div class="card__bottom-rating">
          <span v-for="rating in 5" :key="rating">
            <img
              v-if="rating < treatedMovie.rating"
              src="..\assets\favorite.png"
              alt=""
            />
            <img v-else src="..\assets\favorite_.png" alt="" />
          </span>
          <div>
            {{ treatedMovie.ratingText }}
          </div>
        </div>
      </div>
    </div>
    <!-- //TODO: end todo -->
    <section class="action-points">
      <a
        class="action-points__btn action-points__btn-n-curti"
        @click="notLikedMovies"
        >Não curti!</a
      >
      <a class="action-points__btn action-points__btn-pular" @click="getMovie"
        >pular</a
      >
      <a
        class="action-points__btn action-points__btn-curti"
        @click="likedMovies"
        >Curti!</a
      >
    </section>
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
        id: 0,
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
  mounted() {
    this.getMovie();
  },
  methods: {
    getMovie() {
      let movieNumber = Math.floor(620936 * Math.random()); //total 620,936
      this.movie.id = movieNumber;
      axios
        .get(
          "https://api.themoviedb.org/3/movie/" +
            movieNumber +
            "?api_key=" +
            this.apiKey
        )
        .then((response) => {
          var movieResponse = response.data;
          this.movie.title = movieResponse.title;
          if (movieResponse.poster_path != null) {
            this.movie.poster =
              "https://image.tmdb.org/t/p/original" + movieResponse.poster_path;
          } else {
            this.movie.poster = require("../assets/video-camera-vazio.png");
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
    likedMovies() {
      this.$emit("likedMovies", this.treatedMovie);
      this.getMovie();
    },
    notLikedMovies() {
      console.log(this.treatedMovie);
      this.$emit("notLikedMovies", this.treatedMovie);
      this.getMovie();
    },
  },
  computed: {
    treatedMovie() {
      return {
        id: this.movie.id,
        title: this.movie.title,
        poster: this.movie.poster,
        backdrop: this.movie.backdrop,
        year: this.movie.year.slice(0, 4),
        genres: this.movie.genres.join("/"),
        rating: Math.floor(this.movie.rating / 2),
        ratingText: `( ${this.movie.voteCount} avaliações )`,
        treatedSynopsis: this.movie.synopsis.slice(0, 100) + "...",
        synopsis: this.movie.synopsis,
        voteCount: this.movie.voteCount,
      };
    },
  },
};
</script>

<style lang="scss">
$color-red-dark: #ff1c1c;
$color-red-light: #ff5656;
* {
  font-family: Tahoma, sans-serif;
}
.home {
  position: relative;
  height: 60vh;
  &__background-image {
    height: 60vh;
    width: 100vw;
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
.action-points {
  text-align: center;
  &__btn {
    display: inline;
    background-color: white;
    border-radius: 2rem;
    padding: 1.1rem;
    font-weight: 500;
    font-size: 1.4rem;
    margin: 0 2rem;
    text-transform: uppercase;
    cursor: pointer;
    &-n-curti::before {
      content: url("../assets/n-curti.png");
    }
    &-pular {
      font-size: 1.2rem;
    }
    &-curti {
      color: $color-red-dark;
    }
    &-curti::after {
      content: url("../assets/curti.png");
    }
  }
}
</style>
