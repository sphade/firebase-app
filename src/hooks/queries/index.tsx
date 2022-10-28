import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useQuery } from "react-query";
import { auth, db } from "../../firebase/firebase-config";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
export const useUser = (uid: string) => {
  return useQuery(["user",uid], async () => {
    const docRef = doc(db, "vendors", uid || "");
    const result = await getDoc(docRef);
    return result;
  });
};
export const useAirCraft = (uid: string) => {
  

  return useQuery(["airctaft", uid], async () => {
    const q = query(collection(db, "airCrafts"), where("uid", "==", uid),where("archive", "==", false),where("airCraftType", "==", "privateJet"));
    let result:any = []
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      result.push({...doc.data(),id:doc.id})
    })
    
    
    return result;
  });
};
export const useAuthUser = () => {
 
  return useQuery("auth", async () => {
    const user = auth.currentUser;
    return user;
  });
};
