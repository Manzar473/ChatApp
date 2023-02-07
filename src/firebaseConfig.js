import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyDQgBenq02aMAVZ7b_QGDhwHABV_-BX6o8",
    authDomain: "fir-tutorial-52e09.firebaseapp.com",
    projectId: "fir-tutorial-52e09",
    storageBucket: "fir-tutorial-52e09.appspot.com",
    messagingSenderId: "1074667833901",
    appId: "1:1074667833901:web:ffe0b6e3f60434a1f306a4"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);