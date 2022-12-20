<template>
  <Header />
  <router-view class="flex-grow"/>
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
  }
}
</style>
