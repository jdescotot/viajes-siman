import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDoc,
  getDocs,
} from "@firebase/firestore";

const db = getFirestore();

// Creada la conexion a la colecion de transportistas--------------------Transportista Crud
export const createTransportista = async (transportistaData) => {
  const transportistaRef = await addDoc(
    collection(db, "transportistas"),
    transportistaData
  );
  return transportistaRef.id;
};

export const fetchTransportistas = async () => {
  const querySnapshot = await getDocs(collection(db, "transportistas"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Creada la conexion a la colecion de colaboradores---------------------Colaboradores Crud
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

// Creada la conexion a la colecion de sucursales----------------------Sucursales Crud
export const createSucursal = async (sucursalData) => {
  const sucursalRef = await addDoc(collection(db, "sucursales"), sucursalData);
  return sucursalRef.id;
};

export const fetchSucursales = async () => {
  const querySnapshot = await getDocs(collection(db, "sucursales"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// asignada la relacion entre sucursales y colaboradores------------Relacion Sucursal y Coalborador
export const assignColaboradorToSucursal = async (
  colaboradorId,
  sucursalId,
  distance
) => {
  const q = query(
    collection(db, "colaborador_sucursal"),
    where("colaboradoresId", "==", colaboradorId),
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
    console.log("The relationship already exists");
  }
};

export async function fetchColaboradoresBySucursal(sucursalId) {
  const querySnapshot = await getDocs(
    query(
      collection(db, "colaborador_sucursal"),
      where("sucursalId", "==", sucursalId)
    )
  );

  const colaboradores = [];

  for (const doc of querySnapshot.docs) {
    const colaboradorId = doc.data().colaboradoresId;
    const colaboradorDoc = await getDoc(
      doc(db, "colaboradores", colaboradorId)
    );

    if (colaboradorDoc.exists()) {
      colaboradores.push({ id: colaboradorDoc.id, ...colaboradorDoc.data() });
    }
  }

  return colaboradores;
}
