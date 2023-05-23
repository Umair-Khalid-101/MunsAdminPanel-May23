import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  getDoc,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDvpPZYu-lc0naBKzK-BU-qNm6HxSHSahU",
  authDomain: "munstrashvalet-b6d8a.firebaseapp.com",
  projectId: "munstrashvalet-b6d8a",
  storageBucket: "munstrashvalet-b6d8a.appspot.com",
  messagingSenderId: "47876847230",
  appId: "1:47876847230:web:45711f45ab391a7ee4ca2f",
  measurementId: "G-8C126VZY62",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {
  app,
  db,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  query,
  where,
  orderBy,
  onAuthStateChanged,
  getDoc,
  createUserWithEmailAndPassword,
};
