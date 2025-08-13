// lib/user.ts
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { UserDoc } from "@/types/user";

/**
 * Ensure a users/{uid} document exists.
 * - If missing: creates a minimal doc.
 * - If `patch` provided: merges it in (also useful to update lastActive, etc.).
 */
export async function ensureUserDoc(
  uid: string,
  patch?: Partial<UserDoc>
) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    const base: UserDoc = {
      uid,
      displayName: "",
      photos: [],
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
    };
    await setDoc(ref, { ...base, ...(patch ?? {}) }, { merge: true });
  } else if (patch && Object.keys(patch).length) {
    await setDoc(
      ref,
      { ...patch, lastActive: new Date().toISOString() },
      { merge: true }
    );
  }

  return ref;
}
