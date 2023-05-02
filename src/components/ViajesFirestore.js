import { db } from "../firebase-config";

export const saveViaje = async (viajeData) => {
  try {
    const viajesRef = db.collection("viajes");
    const newViajeRef = viajesRef.doc();
    await newViajeRef.set(viajeData);
    console.log(`Viaje saved successfully with ID: ${newViajeRef.id}`);
    return newViajeRef.id;
  } catch (error) {
    console.error("Error saving viaje:", error);
    throw error;
  }
};

export const createViaje = async (
  selectedSucursal,
  selectedTransportista,
  selectedColaboradores,
  selectedDate
) => {
  const viajeData = {
    sucursal: selectedSucursal,
    transportista: selectedTransportista,
    colaboradores: selectedColaboradores,
    date: selectedDate,
  };

  try {
    await saveViaje(viajeData);
    console.log("Viaje saved successfully.");
  } catch (error) {
    console.error("Error saving viaje:", error);
  }
};
