import { db } from "../firebase-config";
import { collection, addDoc, getDocs } from "@firebase/firestore";

const sucursalesColletionREf = collection(db, "sucursales");

export const createSucursal = async (sucursalData) => {
  const sucursalRef = await addDoc(collection(db, "sucursales"), sucursalData);
  return sucursalRef.id;
};

export const fetchSucursales = async () => {
  const querySnapshot = await getDocs(sucursalesColletionREf);
  console.log(querySnapshot);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
