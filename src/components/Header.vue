<template>
<header class="text-white body-font bg-pizza">
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <router-link to="/home">
    <a class="flex title-font font-medium items-center text-white-900 mb-4 md:mb-0">
    <img src="../../public/pizzaicon.png" alt="pizza" class="h-16" 
    />
      <span class="ml-3 text-xl font-black">PIZZZZZA</span>
    </a>
       </router-link>
    <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <router-link to="/home" class="mr-5 text-white hover:text-gray-200">Home</router-link>
      <router-link to="/cart" class="mr-5 text-white hover:text-gray-200">Cart</router-link>
      <router-link to="/signup" class="mr-5 text-white hover:text-gray-200">SignUp</router-link>
      <router-link to="/login" class="mr-5 text-white hover:text-gray-200">Login</router-link>
    </nav>
     <div>ようこそ　<span class="font-semibold">{{authenticatedUser ? auth && auth.displayName : "ゲスト"}}</span>　さん</div>

  </div>
</header>

</template>

<script>
  import  firebase  from "@/firebase/firebase";

export default {
  data() {
    return {
      authenticatedUser:"",
      logintoggle:true,
    }
  },
  methods: {
    logoutUser() {
      firebase.auth().signOut();
    },
    logout() {
      firebase.auth().signOut();
      this.logintoggle = !this.logintoggle
    }
  },
  mounted() {
    //ログインしていればthis.authにデータが格納される
  firebase.auth().onAuthStateChanged((user) => {
    if(user) {
      //ログインOKだった場合
      this.auth = JSON.parse(sessionStorage.getItem("user"))
      this.authenticatedUser = true;
    } else {
      //ログインNGだった場合
      this.authenticatedUser = false;
    }
  })

  },
  
}
</script>
