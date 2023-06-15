import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import {
  // collection,
  getFirestore,
  // getDocs,
  // where,
  // query,
} from "firebase/firestore";
import { mockGroupList } from "../mocks";
import { mockGameList } from "../mocks/mock-games";

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

const db = getFirestore();

export const readGroupCollection: () => Promise<GroupType[]> = async () => {
  return Promise.resolve(mockGroupList);
  // const q = query(collection(db, "group"));
  // const querySnapshot = await getDocs(q);
  // return querySnapshot.docs.map((doc) => {
  //   return { ...doc.data(), uid: doc.id } as GroupType;
  // });
};

export const readGameCollection: () => Promise<GameType[]> = async () => {
  return Promise.resolve(mockGameList);
  // const q = query(collection(db, "game"));
  // const querySnapshot = await getDocs(q);
  // return querySnapshot.docs.map((doc) => {
  //   return { ...doc.data(), uid: doc.id } as GameType;
  // });
};
