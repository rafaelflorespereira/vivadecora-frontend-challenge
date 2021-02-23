<template>
  <div class="poster">
    <div class="poster__card">
      <div class="poster__card--background">
        <img
          :src="movie.poster"
          alt=""
          class="poster__card--background-image"
        />
      </div>
      <div class="poster__card-info">
        <div class="poster__card-info--heading">{{ movie.title }}</div>
        <div class="poster__card-info--rating-img">
          <span v-for="rating in 5" :key="rating">
            <img
              v-if="rating < movie.rating"
              src="..\assets\favorite.png"
              alt=""
            />
            <img v-else src="..\assets\favorite_.png" alt="" />
          </span>
        </div>
        <div class="poster__card-info--rating-text">{{ movie.ratingText }}</div>
        <p class="poster__card-info--synopsis">
          {{ movie.treatedSynopsis }}
          <a
            href="#"
            @click="modalState = true"
            class="poster__card-info--synopsis-1"
            >Synopsis</a
          >
        </p>
      </div>
    </div>
    <MovieModal
      v-if="modalState == true"
      :movie="movie"
      @closeModal="closeModal"
    />
  </div>
</template>

<script>
import MovieModal from "./MovieModal";
export default {
  props: ["movie"],
  components: {
    MovieModal,
  },
  data: () => {
    return {
      modalState: false,
    };
  },
  methods: {
    closeModal(event) {
      this.modalState = event;
    },
  },
};
</script>

<style lang="scss">
$color-red-dark: #ff1c1c;
$font-color: #848484;
.movies {
  position: relative;
  background-color: white;
  padding: 2rem;
  color: $font-color;
  min-height: 60vh;
  text-align: center;
  @media (max-width: 320px) {
    padding: 0.6rem;
  }
  &-empty {
    position: absolute;
    transform: translate(-50%, -50%);
    display: block;
    top: 50%;
    left: 50%;
    text-align: center;
    & img {
      @media (max-width: 320px) {
        height: 220px;
      }
    }
  }
  &::after {
    content: "";
    clear: both;
    display: table;
  }
}

.poster {
  display: inline-block;
  @media (max-width: 320px) {
    width: 145px;
    max-height: 174px;
  }
  &__card {
    position: relative;
    display: inline-block;
    width: 294px;
    max-height: 350px;
    margin: 2rem;
    border-radius: 4px;
    overflow: hidden;
    @media (max-width: 320px) {
      margin: 0;
      width: 135px;
      max-height: 174px;
    }
    &--background {
      background-image: linear-gradient(to top, black, white);
      &-image {
        border-radius: 5px;
        background-size: cover;
        overflow: hidden;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
    &-info {
      background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.5));
      width: 100%;
      text-align: left;
      padding: 1rem;
      position: absolute;
      bottom: 0;
      color: white;
      @media (max-width: 320px) {
        width: auto;
      }
      &--heading {
        width: 70%;
        font-size: 1.2rem;
        font-weight: 800;
        @media (max-width: 320px) {
          width: auto;
        }
      }
      &--rating-img {
        display: inline;
      }
      &--rating-text {
        display: inline;
        right: 0;
        position: absolute;
        transform: translateX(-50%);
        @media (max-width: 320px) {
          display: none;
        }
      }
      &--synopsis {
        display: inline-block;
        @media (max-width: 320px) {
          display: none;
        }
        &-1 {
          display: inline;
          color: $color-red-dark;
        }
      }
    }
  }
}
</style>
