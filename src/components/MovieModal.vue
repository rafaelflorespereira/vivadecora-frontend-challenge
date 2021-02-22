<template>
  <div class="movie-modal">
    <div class="movie-modal__card">
      <div class="movie-modal__card--btn-close" @click="closeModal">X</div>
      <img :src="movie.poster" class="movie-modal__card--poster" />
      <div class="movie-modal__card--heading">{{ movie.title }}</div>
      <div class="movie-modal__card--subheading">
        {{ movie.year }} &bull; {{ movie.genre }} film &bull; {{ runtime }}
      </div>
      <div class="movie-modal__card--rating">
        <span v-for="rating in 5" :key="rating">
          <img
            v-if="rating < movie.rating"
            src="..\assets\favorite.png"
            alt=""
          />
          <img
            class="movie-modal__card--rating-png-2"
            v-else
            src="..\assets\favorite_.png"
            alt=""
          />
        </span>
        <div class="movie-modal__card--rating-text">{{ movie.ratingText }}</div>
      </div>
      <div class="movie-modal__card--synopsis">{{ movie.synopsis }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["movie"],
  methods: {
    closeModal() {
      this.$emit("closeModal", false);
    },
  },
  computed: {
    runtime() {
      var hours = Math.floor(this.movie.runtime / 60);
      var minutes = Math.floor(this.movie.runtime % 60);
      return `${hours} H ${minutes} M`;
    },
  },
};
</script>

<style lang="scss">
$color-red-light: #ff5656;
$header-spacement: 20%;
$font-color: #848484;
$heading-color: #303030;
.movie-modal {
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  display: block;
  z-index: 100;
  &__card {
    color: $font-color;
    position: absolute;
    height: 70vh;
    width: 45vw;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 2%;
    box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.6);
    padding: 2rem;
    text-align: center;
    box-sizing: border-box;
    background-image: linear-gradient(
      to bottom,
      $color-red-light 0,
      $color-red-light $header-spacement,
      white $header-spacement,
      white
    );
    @media (max-width: 320px) {
      top: 0;
      left: 0;
      transform: translate(0);
      margin: 0.5rem;
      width: 95vw;
      height: 95vh;
      padding: 0.5rem;
    }
    &--poster {
      display: block;
      margin: 1rem auto;
      margin-bottom: 2rem;
      max-height: 30%;
      min-width: 18%;
      object-fit: cover;
      border-radius: 4px;
      @media (max-width: 320px) {
        margin-bottom: 1rem;
      }
    }
    &--btn-close {
      position: absolute;
      display: inline-block;
      top: 0;
      right: 0;
      font-size: 2rem;
      background: white;
      padding: 1rem 1.5rem;
      border-radius: 50%;
      line-height: 1;
      transform: translate(30%, -30%);
      cursor: pointer;
      @media (max-width: 320px) {
        font-size: 1.5rem;
        padding: 0.5rem 1rem;
        top: 0.5rem;
        right: 0.5rem;
      }
    }
    &--heading {
      font-size: 1.4rem;
      font-weight: bolder;
      text-transform: uppercase;
      color: $heading-color;
    }
    &--subheading {
      font-size: 0.8rem;
      font-weight: bold;
      text-transform: uppercase;
      margin: 0.4rem;
    }
    &--rating {
      margin: 0.8rem;
    }
    &--rating-png-2 {
      filter: invert(100%);
    }
    &--synopsis {
      font-size: 1.1rem;
      margin: 2rem;
      text-align: left;
      @media (max-width: 320px) {
        margin: 0.8rem;
        height: fit-content;
      }
    }
  }
}
</style>
