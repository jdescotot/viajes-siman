// import { collection, addDoc } from "firebase/firestore";
// import { db } from "../firebase-config";
// const createViaje = async (
//   sucursalId,
//   transportistaId,
//   colaboradoresIds,
//   date
// ) => {
//   try {
//     const viajeData = {
//       sucursalId: sucursalId,
//       transportistaId: transportistaId,
//       colaboradoresIds: colaboradoresIds,
//       date: date,
//     };

//     const docRef = await addDoc(collection(db, "viajes"), viajeData);
//     console.log("Viaje created with ID:", docRef.id);
//   } catch (error) {
//     console.error("Error creating viaje:", error);
//   }
// };
import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import {
  fetchSucursales,
  fetchTransportistas,
  fetchColaboradores,
} from "../components/firestoreOperations";
export default function Viajes() {
  const [sucursales, setSucursales] = useState([]);
  const [transportistas, setTransportistas] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);

  const [selectedSucursal, setSelectedSucursal] = useState("");
  const [selectedTransportista, setSelectedTransportista] = useState("");
  const [selectedColaboradores, setSelectedColaboradores] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  //-----------------------------------------------------------------Fetch Sucursales
  useEffect(() => {
    const fetchData = async () => {
      const sucursalesData = await fetchSucursales();
      console.log(sucursalesData);
      setSucursales(sucursalesData);

      const transportistasData = await fetchTransportistas();
      setTransportistas(transportistasData);
    };

    fetchData();
  }, []);
  //-----------------------------------------------------------------fetch Colaboradores
  useEffect(() => {
    const fetchData = async () => {
      try {
        const colaboradoresData = await fetchColaboradores();
        setColaboradores(colaboradoresData);
      } catch (error) {
        console.error("Error fetching colaboradores:", error);
      }
    };

    fetchData();
  }, []);

  const handleColaboradorCheckbox = (e, colaboradorId) => {
    if (e.target.checked) {
      setSelectedColaboradores([...selectedColaboradores, colaboradorId]);
    } else {
      setSelectedColaboradores(
        selectedColaboradores.filter((id) => id !== colaboradorId)
      );
    }
  };

  //------------------------------------------------------------------SubmitFunction para crear vaije
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      selectedSucursal &&
      selectedTransportista &&
      selectedColaboradores.length > 0 &&
      selectedDate
    ) {
      try {
        await createViaje(
          selectedSucursal,
          selectedTransportista,
          selectedColaboradores,
          selectedDate
        );
        setSelectedSucursal("");
        setSelectedTransportista("");
        setSelectedColaboradores([]);
        setSelectedDate("");
      } catch (error) {
        console.error("Error creating viaje:", error);
      }
    } else {
      alert(
        "Porfavor revisar todos los campos sean correctos antes de ingresarlos de nuevo"
      );
    }
  };

  const createViaje = async (
    sucursalId,
    transportistaId,
    colaboradoresIds,
    date
  ) => {
    try {
      const viajeData = {
        sucursalId: sucursalId,
        transportistaId: transportistaId,
        colaboradoresIds: colaboradoresIds,
        date: date,
      };

      const docRef = await addDoc(collection(db, "viajes"), viajeData);
      console.log("Viaje created with ID:", docRef.id);
    } catch (error) {
      console.error("Error creating viaje:", error);
    }
  };

  console.log("Colaboradores State:", colaboradores);

  return (
    <div className="container mx-auto px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="sucursal"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Sucursal:
          </label>
          <select
            id="sucursal"
            value={selectedSucursal}
            onChange={(e) => setSelectedSucursal(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a sucursal</option>
            {sucursales.map((sucursal) => (
              <option key={sucursal.id} value={sucursal.id}>
                {sucursal.sucursalName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="transportista"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Transportista:
          </label>
          <select
            id="transportista"
            value={selectedTransportista}
            onChange={(e) => setSelectedTransportista(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a transportista</option>
            {transportistas.map((transportista) => (
              <option key={transportista.id} value={transportista.id}>
                {transportista.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Colaboradores:
          </label>
          {colaboradores.map((colaborador) => (
            <div key={colaborador.id}>
              <input
                type="checkbox"
                id={`colaborador-${colaborador.id}`}
                value={colaborador.id}
                checked={selectedColaboradores.includes(colaborador.id)}
                onChange={(e) => handleColaboradorCheckbox(e, colaborador.id)}
                className="mr-2"
              />
              <label htmlFor={`colaborador-${colaborador.id}`}>
                {colaborador.name} {colaborador.lastName}
              </label>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <label
            htmlFor="date"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Date:
          </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Crear Viaje
          </button>
        </div>
      </form>
    </div>
  );
}
