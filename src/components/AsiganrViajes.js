import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  doc as firestoreDoc,
  getDoc,
} from "@firebase/firestore";

import { db } from "../firebase-config";

export default function AsignarViajes() {
  const { sucursalId } = useParams();
  const [colaboradores, setColaboradores] = useState([]);
  const [selectedColaboradores, setSelectedColaboradores] = useState({});
  const [selectedTransportista, setSelectedTransportista] = useState("");
  const [transportistas, setTransportistas] = useState([]);
  const [totalSelectedDistance, setTotalSelectedDistance] = useState(0);

  async function fetchColaboradoresBySucursal(sucursalId) {
    try {
      const colaboradorIdsSnapshot = await getDocs(
        query(
          collection(db, "colaborador_sucursal"),
          where("sucursalId", "==", sucursalId)
        )
      );

      const colaboradoresWithDistance = await Promise.all(
        colaboradorIdsSnapshot.docs.map(async (doc) => {
          const colaboradorId = doc.data().colaboradorId;
          const distance = doc.data().distance;
          const colaboradorDoc = await getDoc(
            firestoreDoc(db, "colaboradores", colaboradorId)
          );

          if (colaboradorDoc.exists()) {
            return {
              id: colaboradorDoc.id,
              distance,
              ...colaboradorDoc.data(),
            };
          }
          return null;
        })
      );

      return colaboradoresWithDistance.filter((colaborador) => colaborador);
    } catch (error) {
      console.error("Error fetching colaboradores by sucursal:", error);
      return [];
    }
  }

  async function fetchTransportistas() {
    try {
      const transportistasSnapshot = await getDocs(
        collection(db, "transportistas")
      );

      return transportistasSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching transportistas:", error);
      return [];
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const colaboradoresData = await fetchColaboradoresBySucursal(sucursalId);
      setColaboradores(colaboradoresData);

      const transportistasData = await fetchTransportistas();
      setTransportistas(transportistasData);
    };

    fetchData();
  }, [sucursalId]);

  const handleCheckboxChange = (colaboradorId, distance, isChecked) => {
    if (isChecked) {
      setSelectedColaboradores((prevState) => ({
        ...prevState,
        [colaboradorId]: distance,
      }));
      setTotalSelectedDistance((prevState) => prevState + distance);
    } else {
      setSelectedColaboradores((prevState) => {
        const newState = { ...prevState };
        delete newState[colaboradorId];
        return newState;
      });
      setTotalSelectedDistance((prevState) => prevState - distance);
    }
  };

  const handleButtonClick = async () => {
    if (!selectedTransportista) {
      alert("Please select a transportista");
      return;
    }

    const selectedColaboradoresIds = Object.keys(selectedColaboradores).filter(
      (key) => selectedColaboradores[key]
    );

    if (selectedColaboradoresIds.length === 0) {
      alert("Please select at least one colaborador");
      return;
    }

    const today = new Date();
    const dateString = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;

    for (const colaboradorId of selectedColaboradoresIds) {
      await addDoc(collection(db, "assigned_colaboradores"), {
        sucursalId,
        transportistaId: selectedTransportista,
        colaboradorId,
        date: dateString,
      });
    }

    alert("Colaboradores assigned successfully!");
  };

  return (
    <div className="container mx-auto px-4">
      <h3>
        Total Selected Distance:{" "}
        {typeof totalSelectedDistance === "number"
          ? totalSelectedDistance.toFixed(2)
          : "N/A"}
      </h3>
      <div className="flex flex-col">
        {colaboradores.map((colaborador) => (
          <label key={colaborador.id} className="inline-flex items-center mt-3">
            <input
              type="checkbox"
              value={colaborador.id}
              className="form-checkbox h-5 w-5 text-gray-600"
              onChange={(e) =>
                handleCheckboxChange(
                  colaborador.id,
                  colaborador.distance,
                  e.target.checked
                )
              }
            />
            <span className="ml-2 text-gray-700">
              {colaborador.name} {colaborador.lastName} - Distance:{" "}
              {colaborador.distance}
            </span>
          </label>
        ))}
      </div>
      <div className="mb-4 mt-4">
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
      <button
        onClick={handleButtonClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </div>
  );
}
