import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useQuery } from "react-query";
import { auth, db } from "../../firebase/firebase-config";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
export const useUser = (uid: string) => {
  return useQuery(["user", uid], async () => {
    const docRef = doc(db, "vendors", uid || "");
    const result = await getDoc(docRef);
    return result;
  });
};
export const useAirCraft = (
  uid: string,
  airCraftType: string,
  isArchived: boolean
) => {
  return useQuery(["airctafts", uid, airCraftType, isArchived], async () => {
    const q = query(
      collection(db, "airCrafts"),
      where("uid", "==", uid),
      where("archive", "==", isArchived),
      where("airCraftType", "==", airCraftType)
    );
    let result: any = [];
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      result.push({ ...doc.data(), id: doc.id });
    });

    return result;
  });
};
export const useCount = (uid: string) => {
  return useQuery(["count", uid], async () => {
    const q = query(
      collection(db, "airCrafts"),
      where("uid", "==", uid),
      where("archive", "==", false)
    );
    const snapshot = await getCountFromServer(q);

    return snapshot.data().count;
  });
};

export const useAircraft = (id: string) => {
  return useQuery(["aircraft", id], async () => {
    const query = doc(db, "airCrafts", id);

    const result = await getDoc(query);

    return result.data();
  });
};
export const useAuthUser = () => {
  return useQuery("auth", async () => {
    const user = auth.currentUser;
    return user;
  });
};
