import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCCc2pN-sdmwoz1aXxqX4rnN1-oUU_5s7w",
  authDomain: "xneon-c12a2.firebaseapp.com",
  projectId: "xneon-c12a2",
  storageBucket: "xneon-c12a2.firebasestorage.app",
  messagingSenderId: "167464497598",
  appId: "1:167464497598:web:39d973982f33b6a17d49ef"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);