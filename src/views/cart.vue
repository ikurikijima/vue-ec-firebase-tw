<template>
  <h1>ショッピングカート</h1>
  <div>
    <div v-for="orderItem in orderItems" :key="orderItem.id" id="item">
      <div>
        <img :src="`../../${orderItem.imagePath}`" alt="" />
        <p>{{ orderItem.name }}</p>
      </div>
      <div id="size">{{ orderItem.size }}</div>
      <div>{{ orderItem.price }}</div>
      <div>{{ orderItem.orderToppingList }}</div>
      <div>{{ orderItem.subTotal }}</div>
      <p>{{ orderItem.id }}</p>

      <p><button id="delete">削除</button></p>
    </div>
    <h1>合計金額:{{ totalPrice }}円</h1>
    <router-link to="/order">
      <button id="btn">お支払いへ進む</button>
    </router-link>
  </div>
</template>

<script>
import axios from "axios";

const carturl = "http://localhost:8000/orderItems";

export default {
  data() {
    return {
      // カートに追加した商品
      orderItems: [],
      // 合計金額
      total: 0,
    };
  },
  mounted() {
    // this.orderItemsにデータを格納
    axios
      .get("http://localhost:3000/orderItems")
      .then((re) => {
        this.orderItems = re.data;
        // consoleƒ.log(re.data.orderItems);
      })
      .catch((err) => console.log(error));
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
