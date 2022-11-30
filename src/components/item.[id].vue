<template>
<ul>
  <li v-for="item in items" :key="item.id">
    <span><img :src="`../../${item.imagePath}`" alt=""></span><br>
    <span>名前：{{ item.name }}</span><br>
    <span>説明：{{ item.description }}</span><br>
    </li>
</ul>
<br>
</template>


<script>
export default {
  data() {
  return {
    items: []
  }
  
},
mounted() {
  axios
  .get('/db.json:id')
  .then((re) => {
    this.items = re.data.items;
    console.log(re);})
  .catch((err) => console.log(error));
}
}
</script>

<style>

</style>
