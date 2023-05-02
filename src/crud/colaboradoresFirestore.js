import { db } from "../firebase-config";
import { collection, addDoc, getDocs } from "@firebase/firestore";

export const createColaborador = async (colaboradorData) => {
  const colaboradorRef = await addDoc(
    collection(db, "colaboradores"),
    colaboradorData
  );
  return colaboradorRef.id;
};

export const fetchColaboradores = async () => {
  const colaboradores = [];
  const querySnapshot = await getDocs(collection(db, "colaboradores"));

  querySnapshot.forEach((doc) => {
    colaboradores.push({ id: doc.id, ...doc.data() });
  });

  return colaboradores;
};
