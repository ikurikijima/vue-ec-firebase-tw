<template>
  <!-- <div v-for="item in items" :key="item.id"> -->
  <div>
    <!-- <h1>{{ $route.params }}</h1> -->
    <h1>{{ item.name }}</h1>
    <img :src="`../../${item.imagePath}`" alt="ピザ" />
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
    <button v-on="click"></button>
    <!-- <h1 style="margin-top:100px;">{{ $route.params.name }}</h1> -->
    <ToppingList></ToppingList>
  </div>
  <!-- </div> -->
</template>

<script>
// import axios from "axios";
import ToppingList from "/Users/ikuri/vue-ec/src/components/ToppingList.vue";

// console.log(item);
// const pizza = params.id;
export default {
  components: {
    ToppingList,
  },
  data() {
    return {
      item: [],
    };
  },
  mounted: async function () {
    const id = this.$route.params.id;
    // console.log(id);
    const detailData = await fetch(`http://localhost:3000/items/${id}`);
    const json = await detailData.json();
    this.item = json;
    // console.log(this.item);
  },
  methods: {
    click: function () {
      console.log(value);
    },
  },
  // console.log(item);
  // axios
  //   .get("/db.json")
  //   .then((re) => {
  //     this.items = re.data.items;
  //     console.log(re.data.items);
  //   })
  //   .catch((err) => console.log(error));
  // props: {
  //   id: Number,
  //   name: String,
  //   imagePath: String,
  //   description: String,
  //   proce: Number
  // }
};
</script>

<style></style>
