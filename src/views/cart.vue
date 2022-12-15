<template>
  <h1>ショッピングカート</h1>
  <div>
    <div v-if="orderItems.length > 0">
      <div  class="card">
      <div v-for="(orderItem, index) in orderItems" :key="orderItem">
        <div>
          <img :src="`../../${orderItem.imagePath}`" alt="" />
          <p>{{ orderItem.name }}</p>
        </div>
        <div id="size">{{ orderItem.size }}</div>
        <div>¥{{ orderItem.price.toLocaleString() }}</div>
        <h3 v-if="orderItem.orderToppingList.length !== 0">プラストッピング</h3>
        <div
          v-for="toppingList in orderItem.orderToppingList"
          :key="toppingList"
        >
          <span>＋　{{ toppingList.name }}</span>
          <span>¥200</span>
        </div>
        <p>
          <button id="delete" @click="onclickDelete(orderItem.id, index)">
            削除
          </button>
        </p>
      </div>
      <h2>小計: ¥{{ totalPrice.toLocaleString() }}円</h2>
      <h1>合計: ¥{{ totalPrice.toLocaleString() }}円</h1>
      <h2>内消消費税:¥{{ (totalPrice * 0.1).toLocaleString() }}円</h2>
      <router-link to="/order">
        <button id="btn">お支払いへ進む</button>
      </router-link>
    </div>
    </div>
    <div v-else-if="orderItems.length === 0">
      <h1>カートに商品がありません</h1>
      <router-link to="/home">
        <button id="btn">ホームに戻る</button>
      </router-link>
    </div>
  </div>

  <!-- <Order /> -->
</template>

<script>
import firebase from "@/firebase/firebase";
import Order from "@/components/Order.vue";

export default {
  // components: {
  //   Order,
  // },
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
      this.total = 0;
      console.log(this.orderItems);
      this.orderItems.map((data) => {
        this.total += data.price;
      });
      return this.total;
    },
  },
  methods: {
    //IDを取得してか削除したかった
    // getIndex(index) {
    //   this.deleteId = this.items[index].id
    //   deleteItem();
    // },

    // deleteItem(deleteId){
    //   firebase.firestore().collection("orderItems").doc(this.deleteId).delete()
    // }
    // totalPrice: function () {
    //   this.total = 0;
    //   console.log(this.orderItems);
    //   this.orderItems.map((data) => {
    //     this.total += data.subTotal;
    //   });
    //   return this.total;
    // },
    //orderItems.id　を消したい

    async onclickDelete(id, index) {
      // console.log("ID", this.orderItems[0]);
      const itemm = this.orderItems.filter((item) => {
        console.log("ここ？？？", item);
        if (item.id === id) {
          return item.id;
        }
      });
      const docId = itemm[0].id;
      console.log("ああああああああ", docId);

      await firebase
        .firestore()
        .collection("orderItems")
        .doc(docId)
        .delete()
        .then(function () {
          console.log("Document successfully deleted!");
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });

      this.total = 0;
      this.orderItems.forEach((orderItem) => {
        this.total += orderItem.subTotal;
      });
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
#card {
  background-color: aquamarine;
}
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
  /* background-color: #ecc4bd; */
  padding: 1px;
  /* border: solid #ecc4bd; */
  border-radius: 30%;
  line-height: 1.9;
  color: rgb(0, 0, 0);
  font-size: 12px;
  font-weight: bold;
}
</style>
