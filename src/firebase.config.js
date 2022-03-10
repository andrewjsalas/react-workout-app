import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA9IgLbxYgZziGOVM7VYaFfXJjf1Urc-sI",
  authDomain: "workout-app-a3469.firebaseapp.com",
  projectId: "workout-app-a3469",
  storageBucket: "workout-app-a3469.appspot.com",
  messagingSenderId: "606568154317",
  appId: "1:606568154317:web:1dd24df5d3b6a0207c1584"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }