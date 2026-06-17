import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDs-ueq_JRck9xe3L2atY4xUoI-ekgk_oM",
  authDomain: "washgo-35b66.firebaseapp.com",
  projectId: "washgo-35b66",
  storageBucket: "washgo-35b66.firebasestorage.app",
  messagingSenderId: "755763274476",
  appId: "1:755763274476:web:84d926277728759905bbc9",
};

const app = initializeApp(firebaseConfig);
// console.log(firebaseConfig);
export const auth = getAuth(app);


 