<template>
  <div>Loginnnnnnn</div>
  <button @click="logoutUser">ログアウト</button>
  <div class="login">
    <div class="login-triangle"></div>

    <h2 class="login-header">Log in</h2>

    <form class="login-container">
      <p><input type="email" placeholder="Email" v-model="email" /></p>
      <p><input type="password" placeholder="Password" v-model="password" /></p>
      <p><input type="submit" @click="submit" value="ログイン" /></p>
    </form>
  </div>
  <div v-if="errorMessage">{{ errorMessage }}</div>
  <router-link to="/signup">新規会員登録はこちら</router-link>
</template>

<script>
import firebase from "@/firebase/firebase";

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    submit() {
      console.log("SUBMIT!!!");
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((result) => {
          console.log("サクセス！", result);
          console.log("USER", result.user);

          //保存したいフィールド
          const auth = {
            displayName: result.user.displayName,
            email: result.user.email,
            uid: result.user.uid,
            refreshToken: result.user.refreshToken,
          };

          //セッションストレージに保存
          //保存するデータ型はstring型
          sessionStorage.setItem("user", JSON.stringify(auth));
          this.$router.push("/home");
        })
        .catch((error) => {
          console.log("エラーー", error);
          this.errorMessage = "ログインに失敗しました";
          this.email = "";
          this.password = "";
        });
    },
    logoutUser() {
      firebase.auth().signOut();
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log("ログイン!!!!!!!");
      } else {
        console.log("ログアウト!!!!!!");
      }
    });
  },
};
</script>
