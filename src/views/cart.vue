<template>
  <h1>ショッピングカート</h1>
  <div>
    <div v-for="(orderItem, index) in orderItems" :key="orderItem">
      <div>
        <img :src="`../../${orderItem.imagePath}`" alt="" />
        <p>{{ orderItem.name }}</p>
      </div>
      <div id="size">{{ orderItem.size }}</div>
      <div>{{ orderItem.price }}</div>
      <div>{{ orderItem.orderToppingList }}</div>
      <div>{{ orderItem.subTotal }}</div>
      <p>{{ orderItem.id }}</p>

      <p>
        <button id="delete" @click="onclickDelete(orderItem.id, index)">
          削除
        </button>
      </p>
    </div>
    <h1>合計金額:{{ totalPrice }}円</h1>
    <router-link to="/order">
      <button id="btn">お支払いへ進む</button>
    </router-link>
  </div>
</template>

<script>
import firebase from "@/firebase/firebase";

export default {
  data() {
    return {
      // カートに追加した商品
      orderItems: [],
      // 合計金額
      total: 0,
      deleteId: "",
      id: "",
    };
  },
  async created() {
    const orderItemsRef = firebase.firestore().collection("orderItems");
    // console.log("orderItemsRef",orderItemsRef);//OK
    const snapshot = await orderItemsRef.get();
    // console.log("snapshot", snapshot);OK

    snapshot.forEach((doc) => {
      const data = { ...doc.data() };
      data.id = doc.id;
      console.log("はい", data); //OK
      this.orderItems.push(data);
    });
    console.log("IDとは", this.orderItems);
  },
  computed: {
    // 合計金額をtotalに格納
    totalPrice: function () {
      console.log(this.orderItems);
      this.orderItems.map((data) => {
        this.total += data.subTotal;
      });
      return this.total;
    },
  },
  methods: {
    click() {
      alert("ボタンがクリックされました。");
    },
    //IDを取得してか削除したかった
    // getIndex(index) {
    //   this.deleteId = this.items[index].id
    //   deleteItem();
    // },

    // deleteItem(deleteId){
    //   firebase.firestore().collection("orderItems").doc(this.deleteId).delete()
    // }
    //orderItems.id　を消したい
    async onclickDelete(id, index) {
    
      // console.log("ID", this.orderItems[0]);
      const itemm = this.orderItems.filter((item) => {
        console.log("ここ",item);

        if (item.id === id) {
          return item.id
        }
      })
      console.log("itemm", itemm.id);
      console.log("itemm", itemm[0].id);
      console.log("orderItems", this.orderItems);
      

      const snapshot = this.orderItems;
      console.log("snapshot", snapshot);
      await firebase.firestore().collection("ordetItems").doc(itemm[0].id).delete();
          this.orderItems.splice(index, 1);

      // this.total = 0;
      // this.orderItems.forEach((cartItem) => {
      //   this.total += cartItem.subTotal;
      // });
    },
  },
};
</script>

<style>
#delete {
  background-color: lightgray;
  color: rgb(255, 255, 255);
  font-weight: bold;
  border-radius: 10%;
  border: none;
  padding: 3px;
  /* margin-left: 20px; */
  width: 50px;
}

#item {
  display: flex;
}

#size {
  background-color: #ecc4bd;
  padding: 1px;
  border: solid #ecc4bd;
  border-radius: 30%;
  line-height: 1.9;
  color: white;
  font-size: 12px;
  font-weight: bold;
}
</style>
