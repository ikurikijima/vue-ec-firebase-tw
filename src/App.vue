<template>
  <Header />
  <!-- <div class="flex flex-col min-h-screen "> -->
  <router-view class="flex-grow"/>
  <!-- </div> -->
  <Footer />
</template>

<script>
import Header from '/src/components/Header.vue'
import Footer from "/src/components/Footer.vue"
import "ress"


export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    // &.router-link-exact-active {
    //   color: #1e88b2;
    
  }
}
</style>
