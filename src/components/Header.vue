<template>
  <header>
    <img src="../../public/header_logo.png" alt="" />
    <div>
      <span>|</span>
      <span><router-link to="/home">Home</router-link></span>
      <span>|</span>
      <span><router-link to="/cart">cart</router-link></span>
      <span>|</span>
      <span><router-link to="/mypage">MyPage</router-link></span>
      <span>|</span>
      <span><router-link to="/signup">SignUp</router-link></span>
      <span>|</span>
      <span><router-link to="/login">Login</router-link></span>
      <span>|</span>
      
      <span>ようこそ　{{authenticatedUser ? auth && auth.displayName : "ゲスト"}}　さん</span>
      <button @click="logoutUser" v-if="authenticatedUser">logout</button>
    </div>

  </header>
</template>

<script>
  import  firebase  from "@/firebase/firebase";

export default {
  data() {
    return {
      // auth: firebase.auth().currentUser.email,
      authenticatedUser:"",

    }
  },
  methods: {
    logoutUser() {
      firebase.auth().signOut();
    }
  },
  mounted() {
    //ログインしていればthis.authにデータが格納される

  firebase.auth().onAuthStateChanged((user) => {
    if(user) {
      console.log("LOGIN");
      this.auth = JSON.parse(sessionStorage.getItem("user"))
      this.authenticatedUser = true;
    } else {
      console.log("LOGOUT");
      this.authenticatedUser = false;
    }
  })

  },
  
}
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
