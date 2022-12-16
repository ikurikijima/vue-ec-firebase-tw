<template>
  <section class="text-gray-600 body-font relative">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-12">
        <h1
          class="font-bold sm:text-3xl text-2xl title-font mb-4 text-gray-900"
        >
          Thank You!!!
        </h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
          お支払い先は、お送りしたメールに記載しておりますのでご確認ください。
        </p>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
          メールが届かない場合は【注文履歴】からご確認ください。
        </p>

        <router-link to="/home">
          <button
            class="mt-8 opacity-80 mb-4 flex mx-auto text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg"
          >
            ホームへ戻る
          </button>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {},
};
</script>

<style></style>
