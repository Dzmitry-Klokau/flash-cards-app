import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2tgDEs-frkZrQ18SCcXDkzC1Ju_1hgzg",
  authDomain: "flash-cards-567cd.firebaseapp.com",
  projectId: "flash-cards-567cd",
  storageBucket: "flash-cards-567cd.appspot.com",
  messagingSenderId: "161496265379",
  appId: "1:161496265379:web:bb07fb8c08c738cd8ac516",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const db = getFirestore();
