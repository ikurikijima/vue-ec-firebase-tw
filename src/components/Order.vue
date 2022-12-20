<template>
    <div>
    <div v-for="(orderItem) in orderItems" :key="orderItem">
      <div>
        <img :src="`../../${orderItem.imagePath}`" alt="" />
        <p>{{ orderItem.name }}</p>
      </div>
      <div id="size">{{ orderItem.size }}</div>
      <div>{{ orderItem.price }}</div>
      <div>{{ orderItem.orderToppingList }}</div>
      <div>{{ orderItem.subTotal }}</div>
      <p>{{ orderItem.id }}</p>


    </div>
    <h1>合計金額:{{ totalPrice }}円</h1>
    <router-link to="/order">
      <button id="btn">お支払いへ進む</button>
    </router-link>
  </div>
</template>


<script>
import firebase from "@/firebase/firebase";
import Order from "@/components/Order.vue";

export default {
  components: {
    Order,
  },
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
      console.log("data", data); //OK
      this.orderItems.push(data);
    });
    console.log("ID", this.orderItems);
  },
  computed: {
    // 合計金額をtotalに格納
    totalPrice: function () {
      this.total = 0;
      console.log(this.orderItems);
      this.orderItems.map((data) => {
        this.total += data.subTotal;
      });
      return this.total;
    },
  },
  methods: {
    totalPrice: function () {
      this.total = 0;
      console.log(this.orderItems);
      this.orderItems.map((data) => {
        this.total += data.subTotal;
      });
      return this.total;
    },

    async onclickDelete(id, index) {
      const itemm = this.orderItems.filter((item) => {
        if (item.id === id) {
          return item.id;
        }
      });
      const docId = itemm[0].id;

      await firebase
        .firestore()
        .collection("orderItems")
        .doc(docId)
        .delete()
        .then(function () {
          console.log("success!");
        })
        .catch(function (error) {
          console.error("Error: ", error);
        });

      this.total = 0;
      this.orderItems.forEach((orderItem) => {
        this.total += orderItem.subTotal;
      });
      this.orderItems.splice(index, 1);
    },
  },
};
</script>
