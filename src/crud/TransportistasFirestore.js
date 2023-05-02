import { db } from "./firebase-config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "@firebase/firestore";

// Create
export const createTransportista = async (transportistaData) => {
  const transportistaRef = await addDoc(
    collection(db, "transportistas"),
    transportistaData
  );
  return transportistaRef.id;
};

// Read
export const fetchTransportistas = async () => {
  const querySnapshot = await getDocs(collection(db, "transportistas"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Update
export const updateTransportista = async (id, updatedData) => {
  const transportistaRef = doc(db, "transportistas", id);
  await updateDoc(transportistaRef, updatedData);
};

// Delete
export const deleteTransportista = async (id) => {
  const transportistaRef = doc(db, "transportistas", id);
  await deleteDoc(transportistaRef);
};
