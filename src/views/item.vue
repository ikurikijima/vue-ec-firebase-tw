<template>
  <!-- <div v-for="item in items" :key="item.id"> -->
  <div>
    <h1>商品詳細</h1>
    <h1>{{ detail.name }}</h1>
    <img :src="`../../${detail.imagePath}`" alt="pizza" />
    <h1>{{ detail.description }}</h1>
    <input
      type="radio"
      name="size"
      id="priceM"
      :value="detail.priceM"
      v-model="size"
      onChange
      defalutChecked
    />
    <span>{{ detail.priceM }}</span>
    <input
      type="radio"
      name="size"
      id="priceL"
      :value="detail.priceL"
      v-model="size"
      onChange
      defalutChecked
    />
    <span>{{ detail.priceL }}</span>
    <br />
    <div>選択サイズ：{{ size }}</div>
    <div v-for="option in options" :key="option.id">
      <label>
        <input
          type="checkbox"
          id="options.id"
          v-model="choiceOptions"
          :value="option"
        />
        {{ option.name }}</label
      >
      <p>{{ option.price }}</p>
    </div>
    <!-- 選択したトッピングが入っている↓ -->
    <h3>トッピング合計：{{ total }}円</h3>
    <h3>choiseOptions中身：{{ choiceOptions }}円</h3>
    <router-link to="/cart">
    <button @click="click()">カートへ入れる</button>
    </router-link>
    <h1>{{ detail }}</h1>
  </div>
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
      total: "",
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
    async getOptions() {
      const toppingListRef = firebase.firestore().collection("options");
      console.log("トッピングリスト", toppingListRef); //OK
      const snapshot = await toppingListRef.get();
      console.log("スナップショット", snapshot);

      snapshot.forEach((doc) => {
        const topping = { ...doc.data() };
        console.log("でて！！！", topping);
        this.options.push(topping);
      });
      console.log("optionsの中身", this.options);
    },
    async click() {
      console.log("サイズ〜〜〜", this.size);
      console.log("ここ追加したい", this.detail);
      this.detail.price = this.total;
      console.log("detail追加された？", this.detail);
      
      this.detail.orderToppingList = this.choiceOptions;

      console.log("チョイスオプション",this.detail);
      //カートに追加
      firebase.firestore().collection("orderItems").add(this.detail);
      // firebase
      //   .firestore()
      //   .collection("orderItems")
      //   .add({orderToppingList:this.choiceOptions});
    },

    toppingTotal() {
      this.total = this.size + this.choiceOptions.length * 200;
    },
  },
};
</script>

<style></style>
