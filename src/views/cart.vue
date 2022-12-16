<template>
  <div v-if="orderItems.length > 0">
    <h1 class="mt-4 text-2xl  font-bold text-center">ShoppingCart</h1>

    <section
      class="text-gray-600 body-font overflow-hidden my-2"
      v-if="orderItems.length > 0"
    >
      <div class="container px-5 py-12 mx-auto">
        <div
          class="lg:w-4/5 mx-auto flex flex-wrap my-12"
          v-for="(orderItem, index) in orderItems"
          :key="orderItem"
        >
          <img
            alt="ecommerce"
            class="lg:w-1/2 w-full lg:h-60 h-64 object-cover object-center rounded"
            :src="`../../${orderItem.imagePath}`"
          />
          <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1
              class="text-gray-900 text-3xl title-font font-medium mb-1 text-center"
            >
              {{ orderItem.name }}
            </h1>

            <div class="flex items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div class="items-center">
                <!-- ここにトッピング関連 -->
                <!-- <h3 class="font-bold">Size</h3> -->
                <br />
                <h3
                  class="font-bold"
                  v-if="orderItem.orderToppingList.length !== 0"
                >
                  プラストッピング
                </h3>
                <div
                  v-for="toppingList in orderItem.orderToppingList"
                  :key="toppingList"
                  class="mx-2"
                >
                  <p class="flex">{{ toppingList.name }}</p>
                </div>
              </div>
            </div>
            <div class="flex">
              <span class="title-font font-medium text-2xl text-gray-900"
                >¥{{ orderItem.price.toLocaleString() }}</span
              >
              <button
                class="flex ml-auto text-white bg-gray-300 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded"
                @click="onclickDelete(orderItem.id, index)"
              >
                削除
              </button>
            </div>
          </div>
        </div>

        <div class="text-left items-center lg:w-4/5 mx-auto flex flex-wrap my-12">
        <div class="text-left lg:w-4/5 mx-auto flex-wrap my-12">
          <h2 class="font-bold">小計: ¥{{ totalPrice.toLocaleString() }}円</h2>
          <h1 class="font-bold text-2xl my-0.5">合計: ¥{{ totalPrice.toLocaleString() }}円</h1>
          <h2 class="font-bold">
            内消消費税:¥{{ (totalPrice * 0.1).toLocaleString() }}円
          </h2>
        </div>
        <div class="ml-auto">
        <router-link to="/order">
          <button
            id="btn"
            class="flexo text-white bg-orange-800 border-0 py-2 px-6 focus:outline-none hover:bg-orange-900 rounded"
          >
            お支払いへ進む
          </button>
        </router-link>
        </div>
      </div>
      </div>
    </section>

    <div>
   
    </div>
  </div>
  <div v-else-if="orderItems.length === 0">
    <section class="text-gray-600 body-font relative">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-12">
      <h1 class=" sm:text-3xl text-2xl title-font mb-4 text-gray-900">カートに商品がありません</h1>
          <router-link to="/home">
      <button id="btn" class="mt-4 text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded">ホームに戻る</button>
    </router-link>
    </div>
    
      </div>
</section>
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
