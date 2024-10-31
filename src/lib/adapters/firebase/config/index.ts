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
  where as Where,
  orderBy as OrderBy,
  WhereFilterOp,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  OrderByDirection,
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
  where = [],
  orderBy = [],
}: {
  collection_name: string;
  where?: { field: string; operator: WhereFilterOp; value: string | boolean | Date | any }[];
  orderBy?: { field: string; direction: OrderByDirection }[];
}): Promise<T[]> {
  const q = query(
    collection(db, collection_name),
    ...where?.map((filter) =>
      Where(filter.field, filter.operator, filter.value)
    ),
    ...orderBy.map((filter) => OrderBy(filter.field, filter.direction))
  );
  const querySnapshot = await getDocs(q);

  const result = [] as T[];

  querySnapshot.forEach((doc) =>
    result.push({ databaseId: doc.id, ...doc.data() } as T)
  );

  return result;
}
