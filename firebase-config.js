import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDEyaVjNcEtN5gdV6ergVeLBsKLlfaXBII",
  authDomain: "nipobet-43d60.firebaseapp.com",
  projectId: "nipobet-43d60",
  storageBucket: "nipobet-43d60.appspot.com",
  messagingSenderId: "726272142233",
  appId: "1:726272142233:web:e82a6bf25c1ad9c8068108"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
