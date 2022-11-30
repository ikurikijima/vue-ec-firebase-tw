<template>
  <HeaderComponent />
  <div :class="[isOrderShow ? 'hidden' : '']">
    <h1 >カートに注文がありません</h1>
    <p>カートが空です。お買い物を続けましょう！</p>
    <a @click="goToHome" href="#">
        ホームへ
        <svg  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </a>
  </div>

  <div :class="[isOrderShow ? '' : 'hidden']">
    <div>
      <div>
        <h5>Cart</h5>
        <a href="#">
          View all
        </a>
      </div>
      <div>
        <ul role="list">
          <li v-for="orderItem in orderItems" :key="orderItem.id">
            <div>
              <div>
                <img  :src=orderItem.imagePath alt="Neil image">
              </div>
              <div >
                <p>
                    {{orderItem.name}}
                </p>
                <ul>
                  <li v-for="(topping, index) in orderItem.toppings" :key="index">
                    {{topping.name}}: {{topping.price}}円
                  </li>
                </ul>
              </div>
              <div>
                  {{orderItem.totalPrice}}円(税抜)
              </div>
              <div>
                <button @click="deleteOrderItem(orderItem.id)">削除</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <hr>
    <h1 >計: {{totalOrderPrice}}円(税抜)</h1>
    <p>カートに{{orderItems.length}}件の注文が入っています。</p>
    <a @click="goToConfirm" href="#" >
      Order
      <svg  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </a>
  </div>

</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';

const cartUrl = "http://localhost:8000/orderItems";

export default {
  name: 'CartView',
  components: { HeaderComponent },
  data() {
    return {
      orderItems: [],
      totalOrderPrice: 0,
      isOrderShow: true,
    }
  },
  methods: {
    async deleteOrderItem(id) {
      await fetch(`http://localhost:8000/orderItems/${id}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const response = await fetch(cartUrl).then(res => res.json());
      this.orderItems = response;
      this.totalOrderPrice = 0;
      this.orderItems.forEach(orderItem => {
        this.totalOrderPrice += orderItem.totalPrice;
      });
      if(this.orderItems.length === 0) {
        this.isOrderShow = false;
      }
    },
    async goToConfirm() {
      if(document.cookie) {
        this.$router.push('/confirm');
      } else {
        this.$router.push({
          name: 'login',
          query: {
            from: 'cart'
          }
        });
      }
    },
    goToHome () {
      this.$router.push('/');
    }
  },
  async created() {
    const response = await fetch(cartUrl).then(res => res.json());
    this.orderItems = response;
    this.orderItems.forEach(orderItem => {
      this.totalOrderPrice += orderItem.totalPrice;
    });
    if(this.orderItems.length === 0) {
        this.isOrderShow = false;
    }
  }
}
</script>
