import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZ5Ds3Fm9qCN-kPsMjlktv8lzRja2hvls",
  authDomain: "viajes-3beda.firebaseapp.com",
  projectId: "viajes-3beda",
  storageBucket: "viajes-3beda.appspot.com",
  messagingSenderId: "1088276695278",
  appId: "1:1088276695278:web:c5a1129260b496c3d50bff",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
