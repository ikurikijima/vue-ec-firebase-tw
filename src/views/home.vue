<template>
  <section class="text-gray-600 body-font">
    <div
      class="grid lg:grid-cols-3 container px-5 py-12 mx-auto md:grid-cols-2 sm:grid-cols-1"
    >
      <div v-for="item in items" :key="item.name" class="p-4 w-full hover:bg-yellow-100 rounded">
        <router-link
          :to="{
            name: 'item',
            params: {
              id: item.id,
            },
          }"
          class="link"
        >
          <a class="block relative h-60 rounded overflow-hidden">
            <img
              alt="pizza"
              class="object-cover object-center w-full h-full block"
              :src="`../../${item.imagePath}`"
            />
          </a>
          <div class="mt-4">
            <h2 class="text-gray-900 title-font text-lg font-bold">
              {{ item.name }}
            </h2>
            <p class="mt-1">
              <span class="mx-4">M</span>
              ¥{{ item.priceM.toLocaleString() }}
            </p>
            <p class="mt-1">
              <span class="mx-5">L</span>
              ¥{{ item.priceL.toLocaleString() }}
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import firebase from "@/firebase/firebase";

export default {
  data() {
    return {
      items: [],
      data: [],
    };
  },
  //   methods:{
  //   itemd(id){
  //     this.$router.push({
  //       name: 'item',
  //       params: {
  //       id:this.items[0].id,
  //       name:this.items[0].id}
  //       })
  //   }
  // },
  mounted() {
    this.getRooms();
  },
  methods: {
    async getRooms() {
      const itemDetailsRef = firebase.firestore().collection("items");
      console.log("itemDetailsRef   1", itemDetailsRef); //OK
      const snapshot = await itemDetailsRef.get();
      console.log("snapshot  2", snapshot); //OK

      snapshot.forEach((doc) => {
        const data = { ...doc.data() };
        data.id = doc.id;
        console.log("でてる？？", data);
        this.items.push(data);
      });
      console.log("確認", this.items);
    },
  },
};
</script>

//
<style lang="scss">
// .waku {
//   margin: 3%;
//   display: flex;
//   // justify-content: space-between;
//   flex-wrap: wrap;
//   :nth-child(3n + 1) {
//     margin-left: 0;
//   }

//   .item {
//     width: 500px;
//     height: 360px;
//     background-color: rgb(215, 212, 212);
//     // padding: 50px;
//     margin: 10px;
//     justify-content: space-between;
//   }

//   img {
//     width: 330px;
//     height: 230px;
//     margin: 25px 0 10px 0;
//   }

//   .name {
//     font-size: 23px;
//     font-weight: 600;
//   }

//   .item {
//     font-size: 18px;
//   }

//   .link,
//   .link:visited {
//     color: rgb(0, 0, 0);
//     text-decoration: none;
//   }
// }
//
</style>
