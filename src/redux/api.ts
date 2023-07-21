import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import { mockGroupList } from "../mocks";
import { db } from "../service/firebase";
import { mockGameList, mockGameNameList } from "../mocks/mock-games";

const USE_MOCKS = false; // process.env.NODE_ENV === "development";

export const api = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ["GroupCollection", "GameCollection"],
  keepUnusedDataFor: 60 * 15, // 15 min
  endpoints: (builder) => ({
    groupCollection: builder.query<GroupType[], void>({
      async queryFn() {
        try {
          console.log("fetchGroupCollection");
          if (USE_MOCKS) {
            return Promise.resolve({ data: mockGroupList });
          }
          const q = query(collection(db, "group"));
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id } as GroupType;
          });
          return { data };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ["GroupCollection"],
    }),
    groupById: builder.query<GroupType, string>({
      async queryFn(id) {
        console.log("groupById");
        try {
          if (USE_MOCKS) {
            const group = mockGroupList.find((g) => g.id === id);
            const data = group ?? mockGroupList[0];
            return { data };
          }
          const docRef = doc(db, "group", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = { ...(docSnap.data() as GroupType), id };
            return { data };
          }
          return { error: `No such document: ${id}` };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ["GroupCollection"],
    }),
    updateGroupCollection: builder.mutation({
      async queryFn({ groupId, newGroup }) {
        try {
          if (USE_MOCKS) {
            return { data: null };
          }

          if (groupId) {
            // update existing doc
            const docRef = doc(db, "group", groupId);
            setDoc(docRef, newGroup);
          } else {
            // Add a new document with a generated id.
            const collectionRef = collection(db, "group");
            const res = await addDoc(collectionRef, newGroup);
            console.log(res.id);
          }

          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["GroupCollection"],
    }),
    gameCollection: builder.query<GameType[], void>({
      async queryFn() {
        try {
          console.log("gameCollection");
          if (USE_MOCKS) {
            return { data: mockGameList };
          }
          const q = query(collection(db, "game"));
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id } as GameType;
          });
          return { data };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ["GameCollection"],
    }),
    gameIds: builder.query<GameIdsType[], void>({
      async queryFn() {
        console.log("gameIds");
        try {
          if (USE_MOCKS) {
            return { data: mockGameNameList };
          }
          const q = query(collection(db, "game"));
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map((doc) => {
            return { id: doc.id, title: doc.data().title } as GameIdsType;
          });
          return { data };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ["GameCollection"],
    }),
    gameById: builder.query<GameType, string>({
      async queryFn(id) {
        console.log("gameById");
        try {
          if (USE_MOCKS) {
            const game = mockGameList.find((g) => g.id === id);
            const data = game ?? mockGameList[0];
            return { data };
          }
          const docRef = doc(db, "game", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const game = { ...(docSnap.data() as GameType), id };
            const data = {
              ...game,
              cards: game.cards.map((c) => ({
                ...c,
                uuid: uuidv4(),
              })),
            };
            return { data };
          }
          return { error: `No such document: ${id}` };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ["GameCollection"],
    }),
    updateGameCollection: builder.mutation({
      async queryFn({ gameId, newGame }) {
        try {
          if (USE_MOCKS) {
            return { data: null };
          }

          if (gameId) {
            // update existing doc
            const docRef = doc(db, "game", gameId);
            setDoc(docRef, newGame);
          } else {
            // Add a new document with a generated id.
            const collectionRef = collection(db, "game");
            const res = await addDoc(collectionRef, newGame);
            console.log(res.id);
          }

          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["GameCollection"],
    }),
  }),
});

export const {
  useGroupCollectionQuery,
  useUpdateGroupCollectionMutation,
  useLazyGroupByIdQuery,
  useGameCollectionQuery,
  useGameIdsQuery,
  useLazyGameByIdQuery,
  useUpdateGameCollectionMutation,
} = api;
