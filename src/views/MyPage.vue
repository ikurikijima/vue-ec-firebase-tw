<template>
  <div class="about">
    <h1>My Page</h1>
    <button
    @click="logout"
    >ログアウト</button>
  </div>
</template>

<script>
import firebase from "@/firebase/firebase"
export default {
  
  data() {
    return {

    }
  },
  methods: {
    logout(){
      console.log("ログアウトしました");
      firebase.auth()
      .signOut()
      .then(() => {
        localStorage.message = "ログアウトしました"
        this.$router.push("/login")
      })
      .catch((error) => {
        console.log(error);
      }) 
    }
  }


}
</script>
