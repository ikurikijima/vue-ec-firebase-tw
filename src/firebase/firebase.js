// import firebase from 'firebase/compat/app'
// import 'firebase/compat/firestore';
import firebase from "firebase"
const firebaseConfig = {
  apiKey: "AIzaSyAg8s9dWq24xnHow4ktQ4OgsvQgWYDln64",
  authDomain: "pizzaec-f4e37.firebaseapp.com",
  projectId: "pizzaec-f4e37",
  storageBucket: "pizzaec-f4e37.appspot.com",
  messagingSenderId: "918819490845",
  appId: "1:918819490845:web:1b787ebb129a0b7f43caf4",
  measurementId: "G-M0CKECBKLJ"
};

//init firebase
firebase.initializeApp(firebaseConfig)

// //init firebase service
// const projectFirestore = firebase.firestore()

// //ユーザー認証機能を提供・ユーザー情報をクラウドで保存してくれる
// const projectAuth = firebase.auth();

export default firebase;
