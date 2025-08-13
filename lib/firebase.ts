// lib/firebase.ts
import Constants from "expo-constants";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
  signInAnonymously,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Read config from app.json -> expo.extra.firebase
const cfg = (Constants.expoConfig?.extra as any)?.firebase ?? {};
if (!cfg || !cfg.apiKey) {
  console.warn(
    "[firebase] Missing config in app.json -> expo.extra.firebase (using empty config for now)"
  );
}

// Initialize the app (idempotent)
const app = getApps().length ? getApp() : initializeApp(cfg);

// Initialize Auth for RN with persistent storage.
// initializeAuth throws if it's already been created, so fall back to getAuth.
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch {
  auth = getAuth(app);
}

export const db = getFirestore(app);
export const storage = getStorage(app);
export { app, auth };

/** Ensure there's a signed-in user (anonymous). Safe to call on app start. */
export async function ensureAnonAuth() {
  if (!auth.currentUser) {
    await signInAnonymously(auth);
  }
  return auth.currentUser;
}
