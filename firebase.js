import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBNwbl9txtoLtr5DXSy38_Bspbo6GMTcCI",
  authDomain: "employee-crud-de75e.firebaseapp.com",
  projectId: "employee-crud-de75e",
  storageBucket: "employee-crud-de75e.appspot.com",
  messagingSenderId: "332517388988",
  appId: "1:332517388988:web:c19f9074aadaabf5fad6b9",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

const colRef = collection(db, "employees");

export const addEmployee = (name, salary, birth) =>
  addDoc(colRef, { name, salary, birth });

export const onGetEmployees = (func) => onSnapshot(colRef, func);

export const deleteEmployee = (id) => deleteDoc(doc(db, "employees", id));

export const getEmployee = (id) => getDoc(doc(db, "employees", id));

export const editEmployee = (id, values) =>
  updateDoc(doc(db, "employees", id), { ...values });
