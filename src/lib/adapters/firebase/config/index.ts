// Import the functions you need from the SDKs you need
import { globalConfig } from "@/lib/configs";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: globalConfig.firebase.apiKey,
  authDomain: globalConfig.firebase.authDomain,
  projectId: globalConfig.firebase.projectId,
  storageBucket: globalConfig.firebase.storageBucket,
  messagingSenderId: globalConfig.firebase.messagingSenderId,
  appId: globalConfig.firebase.appId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const fireSignIn = signInWithEmailAndPassword;
export const fireSignOut = signOut;

export const onChange = onAuthStateChanged;

const db = getFirestore(app);

export async function add<T>({
  collection_name,
  data,
  id,
}: {
  collection_name: string;
  data: T;
  id?: string;
}): Promise<T> {
  const docRef = await setDoc(doc(db, collection_name, id ?? ""), data as any);

  return docRef as T;
}

export async function read<T>({
  collection_name,
}: {
  collection_name: string;
}): Promise<T[]> {
  const q = query(collection(db, collection_name));
  const querySnapshot = await getDocs(q);

  const result = [] as T[];

  querySnapshot.forEach((doc) =>
    result.push({ databaseId: doc.id, ...doc.data() } as T)
  );

  return result;
}
