<template>
  <header>
    <img src="../../public/header_logo.png" alt="" />
    <div>
      <span>|</span>
      <span><router-link to="/home">Home</router-link></span>
      <span>|</span>
      <span><router-link to="/about">About</router-link></span>
      <span>|</span>
      <span><router-link to="/page1">Page1</router-link></span>
      <span>|</span>
      <span><router-link to="/cart">cart</router-link></span>
      <span>|</span>
      <span><router-link to="/id">item</router-link></span>
      <span>|</span>
    </div>
  </header>
</template>

<script>
// export default {
//   data: function () {
//     return;
//   },
// };
</script>

<style lang="scss">
header {
  // display: flex;
  background-color: rgb(207, 66, 19);

  span {
    display: inline-block;
    padding: 25px;
    color: white;

  }
  a:-webkit-any-link {
    text-decoration: none;
    color: white;
    font-weight: 900;
  }
  // img{
  // display:block;
  // padding:auto;
  // background-color: antiquewhite;
  // }

}
</style>
