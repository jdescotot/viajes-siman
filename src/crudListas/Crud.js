import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

export const fetchColaboradores = async () => {
  const colaboradores = [];
  const querySnapshot = await getDocs(collection(db, "colaboradores"));

  querySnapshot.forEach((doc) => {
    colaboradores.push({ id: doc.id, ...doc.data() });
  });

  return colaboradores;
};
