<script>
import Navbar from "./components/Navbar.vue";
import Jumbotron from "./components/Jumbotron.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Jumbotron,
    Footer,
  },
};
</script>

<template>
  <div class="app">
    <Navbar />
    <Jumbotron />
    <!-- <Footer /> -->
  </div>
</template>

<style>
.app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialised;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: lightgrey;
}
</style>
