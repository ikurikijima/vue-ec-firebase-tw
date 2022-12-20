<template>
 <h1 class="mt-4 text-2xl  font-bold text-center">Order details</h1>
    <section
      class="text-gray-600 body-font overflow-hidden my-2"
      v-if="orderItems.length > 0"
    >
      <div class="container px-5 py-12 mx-auto">
        <div
          class="lg:w-4/5 mx-auto flex flex-wrap my-12"
          v-for="orderItem in orderItems"
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
            </div>
          </div>
        </div>

        <div
          class="text-left items-center lg:w-4/5 mx-auto flex flex-wrap my-12"
        >
          <div class="mr-auto text-left lg:w-4/5 mx-auto flex-wrap my-12">
            <h2 class="font-bold">
              小計: ¥{{ totalPrice.toLocaleString() }}円
            </h2>
            <h1 class="font-bold text-2xl my-0.5">
              合計: ¥{{ totalPrice.toLocaleString() }}円
            </h1>
            <h2 class="font-bold">
              内消消費税:¥{{ (totalPrice * 0.1).toLocaleString() }}円
            </h2>
          </div>
          <span>
<div class="ml-auto">
            <router-link to="/Thankyou">
              <button class=" text-2xl mb-4 flex text-white bg-orange-800 border-0 py-2 px-6 focus:outline-none hover:bg-orange-900 rounded">注文確定</button>
            </router-link>
            <router-link to="/cart">
              <button  class="mb-4 flex ml-auto text-white bg-gray-300 border-0 py-1 px-4 focus:outline-none hover:bg-gray-200 rounded">カートへ戻る</button>
            </router-link>
</div>
          </span>
        </div>
      </div>
    </section>

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
        this.total += data.price;
      });
      return this.total;
    },
  },
  methods: {
    totalPrice: function () {
      this.total = 0;
      console.log(this.orderItems);
      this.orderItems.map((data) => {
        this.total += data.price;
      });
      return this.total;
    },

    async onclickDelete(id, index) {
      // console.log("ID", this.orderItems[0]);
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
    },
  },
};
</script>
