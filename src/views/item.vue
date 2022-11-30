<template>
  <!-- <div v-for="item in items" :key="item.id"> -->
  <div>
    <h1>商品詳細</h1>
    <h1>{{ detail.name }}</h1>
    <img :src="`../../${detail.imagePath}`" alt="pizza" />
    <h1>{{ detail.description }}</h1>
    <!-- <h1>{{ $route.params }}</h1> -->
    <h1>{{ item.name }}s</h1>
    <p>{{ item.description }}</p>
    <input
      type="radio"
      name="sizeChoice"
      v-bind:value="item.priceM"
      onChange
      defalutChecked
    />
    <span>{{ item.priceM }}</span>
    <input 
      type="radio" 
      name="sizeChoice" 
      v-bind:value="item.proceL" 
      onChange 
      defalutChecked 
      />
    <span>{{ item.priceL }}</span>
    <br>
    <button v-on="click">カートへ入れる</button>
    <h1 style="margin-top:100px;">{{ $route.params.name }}</h1>
    <ToppingList></ToppingList>
  </div>
</template>

<script>
// import axios from "axios";
import ToppingList from "/Users/ikuri/vue-ec/src/components/ToppingList.vue";

import firebase from "@/firebase/firebase";

// console.log(item);
// const pizza = params.id;
export default {
  components: {
    // ToppingList,
  },
  data() {
    return {
      item: [],
      deteliname: null,
      detail: [],
      id: "", //URL
    };
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
    console.log("id", this.detail);

    // this.detail = idDoc.data();
  },
};
</script>

<style></style>
