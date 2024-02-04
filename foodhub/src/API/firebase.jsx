import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCrQ9L8bHTe6z9Ll7jC2VtuvM4_jAaj-lU",
  authDomain: "restaurateur-menu-image.firebaseapp.com",
  projectId: "restaurateur-menu-image",
  storageBucket: "restaurateur-menu-image.appspot.com",
  messagingSenderId: "894309102385",
  appId: "1:894309102385:web:7e157fbc696b9fdbc0f610"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app)