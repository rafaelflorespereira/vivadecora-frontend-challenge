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
        <div class="card__bottom-rating">
          <span v-for="rating in 5" :key="rating">
            <img
              v-if="rating < treatedMovie.rating"
              src="..\assets\favorite.png"
              alt=""
            />
            <img v-else src="..\assets\favorite_.png" alt="" />
          </span>
          <div class="card__bottom-rating--text">
            {{ treatedMovie.ratingText }}
          </div>
        </div>
        <p class="card__bottom-description">
          {{ treatedMovie.treatedSynopsis }}
        </p>
        <span>
          <a href="#" @click="modalState = true" class="card__bottom-link">
            Synopsis</a
          ></span
        >
      </div>
    </div>

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

    <MovieModal
      v-if="modalState == true"
      :movie="treatedMovie"
      @closeModal="closeModal"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import MovieModal from "../components/MovieModal";
export default {
  components: {
    MovieModal,
  },
  data: () => {
    return {
      modalState: false,
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
        runtime: 0,
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
          this.movie.runtime = response.data.runtime;
        })
        .catch((error) => {
          console.log(error);
          this.getMovie();
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
    closeModal(event) {
      this.modalState = event;
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
        treatedSynopsis: this.movie.synopsis.slice(0, 26) + "...",
        synopsis: this.movie.synopsis,
        voteCount: this.movie.voteCount,
        runtime: this.movie.runtime,
      };
    },
  },
};
</script>

<style lang="scss">
$color-red-dark: #ff1c1c;
$color-red-light: #ff5656;
$button-width: 12rem;
$button-height: 1rem;
.home {
  height: 60vh;
  &__background-image {
    display: block;
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    opacity: 0.2;
  }
}
.card {
  position: relative;
  display: block;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 50vh;
  width: 60vw;
  @media (max-width: 320px) {
    top: 40%;
    height: 60vh;
    width: 90vw;
  }
  &__background-image {
    border-radius: 5px;
    background-size: cover;
    overflow: hidden;
    top: 0;
    width: 100%;
    height: 100%;
    background-position: top;
  }
  &__bottom {
    position: absolute;
    bottom: 0;
    color: white;
    width: 90%;
    padding: 2rem;
    @media (max-width: 320px) {
      padding: 1.2rem;
    }
    &-heading {
      width: 50%;
      margin: 0.2rem 0;
      font-size: 1.8rem;
      font-weight: 800;
      @media (max-width: 320px) {
        width: 70%;
        font-size: 1.4rem;
        margin: 1rem 0;
      }
    }
    &-subheading {
      text-transform: uppercase;
      font-size: 1rem;
      @media (max-width: 320px) {
        display: none;
      }
    }
    &-description {
      display: inline-block;
      font-size: 1.2rem;
      @media (max-width: 320px) {
        font-size: 0.9rem;
      }
    }
    &-rating {
      & span {
        content: " ";
      }
      display: inline;
      position: absolute;
      top: 0;
      right: 0;
      padding: 2rem;
      @media (max-width: 320px) {
        position: relative;
        font-size: 0.8rem;
        right: 0;
        padding: 0;
        margin: 0.5rem 0;
      }
      &--text {
        @media (max-width: 320px) {
          float: right;
        }
      }
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
  margin-top: 6rem;
  text-align: center;
  position: relative;
  display: flex;
  justify-content: center;
  @media (max-width: 320px) {
    margin-top: 1rem;
  }
  &__btn {
    background-color: white;
    border-radius: 4rem;
    padding: 1rem;
    font-size: 1.4rem;
    margin: 0 2rem;
    text-transform: uppercase;
    cursor: pointer;
    min-width: $button-width;
    min-height: $button-height;
    transition: all 0.4s;
    @media (max-width: 320px) {
      margin: 0 auto;
      min-width: 0;
      border-radius: 3rem;
    }
    &:hover {
      box-shadow: 0 1.6rem 3rem rgba(0, 0, 0, 0.8);
      transform: translateY(-0.4rem);
      @media (max-width: 320px) {
        box-shadow: none;
        transform: translateY(0);
      }
    }
    &:active {
      box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.8);
      transform: translateY(-0.2rem);
      @media (max-width: 320px) {
        box-shadow: none;
        transform: translateY(0);
      }
    }
    &-n-curti::before {
      content: url("../assets/n-curti.png");
      vertical-align: middle;
      margin-right: 0.5rem;
    }
    &-n-curti {
      @media (max-width: 320px) {
        content: url("../assets/n-curti1.png");
        padding: 0.6rem;
        margin: auto;
      }
    }
    &-pular {
      font-size: 1.2rem;
      min-width: 5rem;
      line-height: 2;
      @media (max-width: 320px) {
        font-size: 1.1rem;
        line-height: 1;
        display: block;
        margin: auto;
        padding: 1.3rem;
        height: 1rem;
        min-width: 3rem;
        font-weight: bold;
      }
    }
    &-curti::before {
      content: url("../assets/curti.png");
      vertical-align: middle;
      margin-right: 0.5rem;
      @media (max-width: 320px) {
        content: " ";
      }
    }
    &-curti {
      color: $color-red-dark;
      @media (max-width: 320px) {
        content: url("../assets/curti1.png");
        padding: 0.6rem;
        margin: auto;
      }
    }
  }
}
</style>
