<template>
  <div class="footer">
    <ion-icon class="icon" name="logo-facebook"></ion-icon>
    <ion-icon class="icon" name="logo-instagram"></ion-icon>
    <ion-icon class="icon" name="logo-pinterest"></ion-icon>
    <ion-icon class="icon" name="logo-google"></ion-icon>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.footer {
  content: "";
  position: fixed;
  display: block;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5vh;
  background-color: rgba(56, 56, 56, 0.95);
  border-top: 2px solid #d2dae2;
  text-align: center;
  line-height: 3.5;
  @media (max-width: 320px) {
    display: none;
    visibility: hidden;
  }
}
.icon {
  filter: invert(100%);
  display: inline-block;
  font-size: 1.4rem;
  margin-right: 2rem;
}
</style>
