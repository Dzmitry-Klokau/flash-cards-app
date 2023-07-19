import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

import {
  collection,
  getFirestore,
  getDocs,
  getDoc,
  doc,
  query,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { mockGroupList } from "../mocks";
import { mockGameList, mockGameNameList } from "../mocks/mock-games";

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

const USE_MOCKS = process.env.NODE_ENV === "development";

export const readGroupCollection: () => Promise<GroupType[]> = async () => {
  if (USE_MOCKS) {
    return Promise.resolve(mockGroupList);
  }
  const q = query(collection(db, "group"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id } as GroupType;
  });
};

export const readGameCollection: () => Promise<GameType[]> = async () => {
  if (USE_MOCKS) {
    return Promise.resolve(mockGameList);
  }
  const q = query(collection(db, "game"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id } as GameType;
  });
};

export const readAllGameIds: () => Promise<GameIdsType[]> = async () => {
  if (USE_MOCKS) {
    return Promise.resolve(mockGameNameList);
  }
  const q = query(collection(db, "game"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    return { id: doc.id, title: doc.data().title } as GameIdsType;
  });
};

export const readGameById: (id: string) => Promise<GameType> = async (
  id: string
) => {
  if (USE_MOCKS) {
    const game = mockGameList.find((g) => g.id === id);
    return Promise.resolve(game ?? mockGameList[0]);
  }
  const docRef = doc(db, "game", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const game = { ...(docSnap.data() as GameType), id };
    return Promise.resolve({
      ...game,
      cards: game.cards.map((c) => ({
        ...c,
        uuid: uuidv4(),
      })),
    });
  }
  return Promise.reject(new Error(`No such document: ${id}`));
};

export const readGroupById: (id: string) => Promise<GroupType> = async (
  id: string
) => {
  if (USE_MOCKS) {
    const group = mockGroupList.find((g) => g.id === id);
    return Promise.resolve(group ?? mockGroupList[0]);
  }
  const docRef = doc(db, "group", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const group = { ...(docSnap.data() as GroupType), id };
    return Promise.resolve(group);
  }
  return Promise.reject(new Error(`No such document: ${id}`));
};

export const writeGame: (
  data: GameType
) => Promise<void | { id: string }> = async (data: GameType) => {
  if (USE_MOCKS) {
    return Promise.resolve();
  }
  const dataWithoutUuid = {
    ...data,
    cards: data.cards.map((c) => ({
      primary: c.primary,
      secondary: c.secondary,
      optional: c.optional,
    })),
  };

  if (data.id) {
    // update existing doc
    const docRef = doc(db, "game", data.id);
    return setDoc(docRef, dataWithoutUuid);
  } else {
    // Add a new document with a generated id.
    const collectionRef = collection(db, "game");
    const res = await addDoc(collectionRef, dataWithoutUuid);
    return Promise.resolve({ id: res.id });
  }
};

export const writeGroup: (
  data: GroupType
) => Promise<void | { id: string }> = async (data: GroupType) => {
  if (USE_MOCKS) {
    return Promise.resolve();
  }

  if (data.id) {
    // update existing doc
    const docRef = doc(db, "group", data.id);
    return setDoc(docRef, data);
  } else {
    // Add a new document with a generated id.
    const collectionRef = collection(db, "group");
    const res = await addDoc(collectionRef, data);
    return Promise.resolve({ id: res.id });
  }
};
