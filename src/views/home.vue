<template>
  <div>
    <div class="waku">
      <div v-for="item in items" :key="item.name" class="item">
    <div>{{ item.id }}</div>
        <router-link
          :to="{
            name: 'item',
            params: {
              id: item.id,
            },
          }"
          class="link"
        >
          <img :src="`../../${item.imagePath}`" alt="ピザ" />
          <div class="name">{{ item.name }}</div>
        </router-link>
        <div class="plice">¥{{ item.priceM.toLocaleString()}}</div>
        <div class="plice">¥{{ item.priceL.toLocaleString() }}</div>
        <div v-for="option in options" :key="option.id"></div>
        <!-- <button type="button" @click="itemd(item.id)">詳細</button> -->
        <!-- <span>説明：{{ item.description }}</span><br> -->
      </div>
    </div>
  </div>

  <h4>あああああああああああ</h4>
</template>



<script>
import axios from "axios";
import firebase from "@/firebase/firebase";

export default {
  data() {
    return {
      items: [],
      data:[]
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

        const data = {...doc.data()}
        data.id = doc.id
        console.log("でてる？？",data);
        this.items.push(data);
      });
      console.log("確認",this.items);
    },
  },
};
</script>

<style lang="scss">
.waku {
  margin: 3%;
  display: flex;
  // justify-content: space-between;
  flex-wrap: wrap;
  :nth-child(3n + 1) {
    margin-left: 0;
  }

  .item {
    width: 500px;
    height: 360px;
    background-color: rgb(215, 212, 212);
    // padding: 50px;
    margin: 10px;
    justify-content: space-between;
  }

  img {
    width: 330px;
    height: 230px;
    margin: 25px 0 10px 0;
  }

  .name {
    font-size: 23px;
    font-weight: 600;
  }

  .item {
    font-size: 18px;
  }

  .link,
  .link:visited {
    color: rgb(0, 0, 0);
    text-decoration: none;
  }
}
</style>
