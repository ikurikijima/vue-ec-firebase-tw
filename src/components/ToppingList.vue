<template>
  <div>
    
    <!-- <div v-for="option in options" :key="option.id">
      <label> -->
        <!-- <input
          type="checkbox"
          id="options.id"
          v-model="choiceOption"
          :value="option"
        /> -->
        <!-- {{ option.name }}</label> -->
      <!-- <p>{{ option }}</p> -->
    <!-- </div> -->
    <!-- <p>{{ choiceOption }}</p> -->
    <!-- <h3> トッピング合計：{{ toppingTotal }}円</h3>
    <router-link to="cart">
    <button>カートに追加</button>
    </router-link> -->
  </div>
</template>

<script>


export default {
  data() {
    return {
      // options: [],
      // choiceOption: [],
    };
  },
//   computed: {
//     toppingTotal: function () {
//       return this.choiceOption.length * 100;
//     },
//   },
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
