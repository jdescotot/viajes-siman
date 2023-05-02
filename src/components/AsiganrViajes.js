import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchColaboradoresBySucursal } from "../components/firestoreOperations";

export default function AsignarViajes() {
  const { sucursalId } = useParams();
  const [colaboradores, setColaboradores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(sucursalId);
      const colaboradoresData = await fetchColaboradoresBySucursal(sucursalId);
      setColaboradores(colaboradoresData);
    };

    fetchData();
  }, [sucursalId]);

  return (
    <div className="container mx-auto px-4">
      <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <option value="">Select a colaborador</option>
        {colaboradores.map((colaborador) => (
          <option key={colaborador.id} value={colaborador.id}>
            {colaborador.name} {colaborador.lastName}
          </option>
        ))}
      </select>
    </div>
  );
}
