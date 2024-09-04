// Import the functions you need from the SDKs you need
import { globalConfig } from "@/lib/configs";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

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
