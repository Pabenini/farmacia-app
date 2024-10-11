// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Sua configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBW7CAhB3cvll_tH7N7_613gwa8kK9Cqew",
    authDomain: "fir-c8d11.firebaseapp.com",
    projectId: "fir-c8d11",
    storageBucket: "fir-c8d11.appspot.com",
    messagingSenderId: "16453126714",
    appId: "1:16453126714:web:1c93ce4c276244b7568303",
    measurementId: "G-WN8KKMVME3"
  };
// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
// Inicializa o Firestore
const db = getFirestore(app);
export { db };