<template>
  <section class="text-gray-600 body-font relative">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-12">
        <h1
          class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900"
        >
          SignUp
        </h1>
      </div>

      <div class="mx-auto">
        <div class="w-full max-w-50%">
          <div class="relative">
            <label for="name" class="leading-7 text-sm text-gray-600"
              >Name</label
            >
            <input
              type="name"
              id="name"
              name="name"
              placeholder="名前"
              required
              v-model="name"
              class="mb-8 w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>

        <div class="flex flex-wrap -m-2">
          <div class="w-full max-w-50%">
            <div class="relative">
              <label for="name" class="leading-7 text-sm text-gray-600"
                >Email</label
              >
              <input
                type="email"
                id="email"
                name="email"
                placeholder="メールアドレス"
                v-model="email"
                class="mb-8 w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>

          <div class="w-full max-w-50%">
            <div class="relative">
              <label for="name" class="mt-12 leading-7 text-sm text-gray-600"
                >Password</label
              >
              <input
                type="text"
                id="password"
                name="password"
                placeholder="パスワード"
                required
                v-model="password"
                class="mb-8 w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div class="p-2 w-full">
            <router-link to="/login">
            <button
              type="submit"
              @click="submit"
              class="flex mx-auto text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg"
            >
              新規登録
            </button> 
            </router-link>
          </div>

          <div
            class="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center"
          >
            <a class="text-yellow-500">PIZZZZZA@email.com</a>
            <p class="leading-normal my-5">
              49 Smith St. <br />Saint Cloud, MN 56301
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="login">
    <div class="login-triangle"></div>

    <h2 class="login-header">Sign Up</h2>

    <form class="login-container">
      <p><input type="text" v-model="name" placeholder="名前" required /></p>

      <p>
        <input
          type="email"
          v-model="email"
          placeholder="メールアドレス"
          required
        />
      </p>

      <p>
        <input type="password" v-model="password" placeholder="パスワード" />
      </p>

      <p><input type="submit" value="新規登録" @click="submit" /></p>
    </form>
  </div>
  <router-link to="/login">ログイン画面はこちら</router-link>
</template>

<script>
import firebase from "@/firebase/firebase";

export default {
  data() {
    return {
      name: [],
      email: [],
      password: [],
      set: {},
    };
  },
  created() {},
  methods: {
    submit() {
      //Authenticationに登録
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(async (result) => {
          await result.user.updateProfile({ displayName: this.name });
        })
        .catch((err) => {
          console.log("エラー", err);
        });

      this.set["name"] = this.name;
      this.set["email"] = this.email;
      this.set["password"] = this.password;

      console.log("SET", this.set);
      firebase.firestore().collection("users").add(this.set);
    },
  },
};
</script>
