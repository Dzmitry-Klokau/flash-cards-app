import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-JPCx5zDYvzg2ySAo0ESrnIr3g5fpxIE",
  authDomain: "flash-cards-817a3.firebaseapp.com",
  //   authDomain: "https://dzmitry-klokau.github.io/__/auth/handler", // https://firebase.google.com/docs/auth/web/redirect-best-practices#update-authdomain
  projectId: "flash-cards-817a3",
  storageBucket: "flash-cards-817a3.appspot.com",
  messagingSenderId: "367168574151",
  appId: "1:367168574151:web:bc81af6fdf6da2edde64e2",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => signInWithPopup(auth, provider);
