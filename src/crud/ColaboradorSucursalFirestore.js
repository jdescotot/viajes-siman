import { db } from "./firebase-config";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  getDoc,
} from "@firebase/firestore";

export const assignColaboradorToSucursal = async (
  colaboradorId,
  sucursalId,
  distance
) => {
  const q = query(
    collection(db, "colaborador_sucursal"),
    where("colaboradorId", "==", colaboradorId),
    where("sucursalId", "==", sucursalId)
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    await addDoc(collection(db, "colaborador_sucursal"), {
      colaboradorId,
      sucursalId,
      distance,
    });
  } else {
    console.log("Esta realccion ya existe");
  }
};

export const fetchColaboradoresBySucursal = async (sucursalId) => {
  const querySnapshot = await getDocs(
    query(
      collection(db, "colaborador_sucursal"),
      where("sucursalId", "==", sucursalId)
    )
  );

  const colaboradores = [];

  for (const doc of querySnapshot.docs) {
    const colaboradorId = doc.data().colaboradorId;
    const colaboradorDoc = await getDoc(
      doc(db, "colaboradores", colaboradorId)
    );

    if (colaboradorDoc.exists()) {
      colaboradores.push({ id: colaboradorDoc.id, ...colaboradorDoc.data() });
    }
  }

  return colaboradores;
};
