<template>
  <div>
    <h2>Get</h2>
    <label
      >Name<input
        class="form-control"
        type="text"
        placeholder="name"
        v-model="name"
    /></label>
    <br />

    <label
      >Age
      <input
        class="form-control"
        type="number"
        placeholder="age"
        v-model="age"
      />
    </label>

    <br />
    <!-- Exec button and show result -->
    <input class="btn btn-primary" type="button" value="Get" @click="execGet" />
    {{ resGet }}
  </div>
</template>
<script>
import firebase from "@/firebase/firebase";
export default {
  data() {
    return {};
  },
  mounted() {
    const value = {
      name: "きょんちぃ",
      mail: "party-chan@gmail.com",
      zipcode: "160-0022",
      address: "東京都新宿区新宿4",
      tel: "03-2222-2222",
      password: "kyoka",
      Cpassword: "kyoka",
    };
    firebase.firestore().collection("users").add(value);
  },
};
</script>
