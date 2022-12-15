<template>
  <div class="login">
    <div class="login-triangle"></div>

    <h2 class="login-header">Sign Up</h2>

    <form class="login-container">
      <p><input 
      type="text"
      v-model="name"
      placeholder="名前"
      required
       /></p>


      <p><input 
      type="email" 
      v-model="email"
      placeholder="メールアドレス"
      required
       /></p>


      <p><input 
      type="password" 
      v-model="password"
      placeholder="パスワード" 
      /></p>


      <p><input 
      type="submit" 
      value="新規登録" 
      @click="submit"
      /></p>
    </form>
  </div>
  <router-link to="/login">ログイン画面はこちら</router-link>

</template>

<script>
import firebase from "@/firebase/firebase"

export default {
  data() {
    return {
      name: "",
      email: "",
      password:"",
      
    };
  },
  methods:{
    submit(){
      console.log("SUBMITでーす");
      firebase.auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(async (result) => {
        console.log("サクセス！", result);
        await result.user.updateProfile(
          {displayName: this.name}
        )
        // result.user.updateProfile(
        //   profile:{displayName : this.name}
        // )
      })
      .catch((err) => {
        console.log("エラーー",err);
      })
    }
  }
};
</script>
