<template>
  <div>
    <input
      type="radio"
      name="size"
      id="priceM"
      value="priceM"
      v-model="size"
      onChange
      defalutChecked
    />
    <span>{{ detail.priceM }}</span>
    <input
      type="radio"
      name="size"
      id="priceL"
      value=detail.priceL
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
          v-model="choiceOption"
          :value="option"
        />
        {{ options }}</label
      >
      <p>あああああああああああ</p>
    </div>
    <!-- 選択したトッピングが入っている↓ -->
    <p>選んだやつ：{{ choiceOption }}</p>
    <h3>トッピング合計：{{ toppingTotal }}円</h3>
    <h1>{{ item }}</h1>
    <router-link to="/cart">
      <button @click="click()">カートへ入れる</button>
    </router-link>
  </div>
</template>

<script>
import firebase from "@/firebase/firebase";

export default {
  data() {
    return {
      options: [],
      choiceOption: [],
      detail: [],
      item: [],
      deteliname: null,
      id: "", //URL
      size: "",
    };
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
    click() {
      console.log("サイズ〜〜〜", this.size);
      const sizechoice =
        this.size === "priceM" ? this.detail.priceM : this.detail.priceL;
      // console.log("sizechoice",sizechoice);//OK
      // const value = {
      //   sizechoice,//M or Lの価格
      // };
      // const price = {
      //   sizechoice
      // }
      // console.log("PRICE",price);
      console.log("ここ追加したい", this.detail);
      this.detail.price = sizechoice;
      console.log("detail追加された？", this.detail);
      //カートに追加
      firebase.firestore().collection("orderItems").add(this.detail);
    },
    computed: {
      toppingTotal: function () {
        return this.choiceOption.length * 200;
      },
    },
  },
};
</script>

<style>
button {
  background-color: rgb(96, 66, 2);
  color: white;
  padding: 10px 50px;
  margin-top: 20px;
  border-radius: 30px;
}
</style>
