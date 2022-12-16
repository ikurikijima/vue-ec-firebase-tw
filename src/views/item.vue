<template>
  <h1>{{ size }}</h1>
  <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 py-24 mx-auto">
      <div class="lg:w-4/5 mx-auto flex flex-wrap items-center">
        <img
          alt="pizza"
          class="lg:w-1/2 w-full lg:h-80 h-64 object-cover object-center rounded"
          :src="`../../${detail.imagePath}`"
        />
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
            {{ detail.name }}
          </h1>
          <div class="flex mb-4">
            <span class="flex items-center"> </span>
          </div>
          <p class="leading-relaxed">{{ detail.description }}</p>
          <div
            class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5"
          >
            <div class="flex items-center">
              <span class="mr-4">サイズ</span>

              <input
                type="radio"
                name="size"
                id="priceM"
                :value="detail.priceM"
                v-model="size"
              />
              <label for="priceM" class="mr-4"
                ><span class="mr-2 font-bold">M</span>¥{{
                  detail.priceM.toLocaleString()
                }}</label
              >
              <input
                type="radio"
                name="size"
                id="priceL"
                :value="detail.priceL"
                v-model="size"
                defalutChecked
              />
              <label for="priceL"
                ><span class="mr-2 font-bold">L</span>¥{{
                  detail.priceL.toLocaleString()
                }}</label
              >
            </div>
          </div>
          <div class="mb-4">
            <div class="flex items-center font-semibold mb-2">
              プラストッピング　+¥200
            </div>
            <div v-for="option in options" :key="option.id" class="flex">
              <label class="my-0.5 ml-4">
                <input
                  type="checkbox"
                  id="options.id"
                  v-model="choiceOptions"
                  :value="option"
                />
                {{ option.name }}</label
              >
            </div>
          </div>
          <div>
            <span class="title-font font-medium text-2xl text-gray-900"
              >合計　¥{{ total.toLocaleString() }}</span
            >
             <router-link to="/cart"> 
            <button
              @click="click()"
              class="flex ml-auto text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded"
            >
             カートに入れる
            </button>
             </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import axios from "axios";
import ToppingList from "../components/ToppingList.vue";

import firebase from "@/firebase/firebase";

export default {
  components: {
    ToppingList,
  },
  data() {
    return {
      options: [],
      choiceOptions: [],
      item: [],
      deteliname: null,
      detail: [],
      id: "", //URL
      size: "",
      total: 0,
    };
  },
  watch: {
    choiceOptions: function () {
      this.toppingTotal();
    },
    size: function () {
      this.toppingTotal();
    },
  },
  async created() {
    this.id = this.$route.params["id"];
    console.log("id", this.id); //OK

    const idRef = firebase.firestore().collection("items").doc(this.id);
    console.log("idRef", idRef); //OK
    const snapshot = await idRef.get();
    // if(!idDoc.exists){
    //   this.$router.push("/home");
    // // }
    console.log("snapshot", snapshot);

    this.detail = snapshot.data();
    console.log("detail", this.detail);

    // this.detail = idDoc.data();
  },
  mounted() {
    this.toppingTotal();
    this.getOptions();
    //ここ消す↓
    this.size === "priceM" ? this.detail.priceM : this.detail.priceL;
  },
  async created() {
    this.id = this.$route.params["id"];
    console.log("id", this.id); //OK

    const idRef = firebase.firestore().collection("items").doc(this.id);
    console.log("idRef", idRef); //OK
    const snapshot = await idRef.get();
    // if(!idDoc.exists){
    //   this.$router.push("/home");
    // // }
    console.log("snapshot", snapshot);

    this.detail = snapshot.data();
    console.log("detail", this.detail);

    // this.detail = idDoc.data();
  },
  methods: {
    //optionsをfirebaseから取得
    //"トッピングリスト"
    async getOptions() {
      const toppingListRef = firebase.firestore().collection("options");
      const snapshot = await toppingListRef.get();

      snapshot.forEach((doc) => {
        const topping = { ...doc.data() };
        this.options.push(topping);
      });
    },
    async click() {
      this.detail.price = this.total;
      this.detail.orderToppingList = this.choiceOptions;

      //カートに追加
      firebase.firestore().collection("orderItems").add(this.detail);
    },

    toppingTotal() {
      this.total = this.size + this.choiceOptions.length * 200;
    },
  },
};
</script>

<style></style>
