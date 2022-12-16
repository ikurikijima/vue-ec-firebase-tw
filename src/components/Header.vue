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
     <!-- <router-link to="/login">
    <button v-show="logintoggle" class="mx-4 inline-flex items-center bg-red-2 border-0 py-1 px-3 focus:outline-none hover:bg-gray-400 rounded text-base mt-4 md:mt-0">login
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button>
    </router-link> -->
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
