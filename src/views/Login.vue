<template>

<section class="text-gray-600 body-font relative">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-12">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Login</h1>
    </div>
          <div class="p-2 w-full">
            <router-link to="/signup">
          <button class="opacity-80 mb-4 flex mx-auto text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg">新規会員登録はこちら</button>
            </router-link>
        </div>
    <div class="mx-auto">
      <div class="flex flex-wrap -m-2">
        <div class="w-full max-w-50%">
          <div class="relative">
            <label for="name" class="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id="email" name="email" placeholder="Email" v-model="email" class="mb-8 w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
          </div>
        </div>


        <div class="w-full max-w-50%">
          <div class="relative">
            <label for="name" class="mt-12 leading-7 text-sm text-gray-600">Password</label>
            <input type="text" id="password" name="password" placeholder="Password" v-model="password" class="mb-8 w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
          </div>
        </div>
        <div class="p-2 w-full">
          <button type="submit" @click="submit" class="flex mx-auto text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg">ログイン</button>
        </div>
        <div class="p-2 w-full">
          <router-link to="/home">
          <button type="submit" @click="logoutUser" class="mt-4 flex mx-auto text-white bg-gray-300 border-0 py-1 px-4 focus:outline-none hover:bg-gray-200 rounded text-lg">ログアウト</button>
         </router-link>
        </div>
        <div class="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
          <a class="text-yellow-500">PIZZZZZA@email.com</a>
          <p class="leading-normal my-5">49 Smith St.
            <br>Saint Cloud, MN 56301
          </p>
    
        </div>
      </div>
    </div>
  </div>
</section>

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
          console.log("succes", result);
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
          console.log("err", error);
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
        console.log("login");
      } else {
        console.log("logout");
      }
    });
  },
};
</script>
