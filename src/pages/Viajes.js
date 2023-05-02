import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSucursales } from "../components/firestoreOperations";

export default function Viajes() {
  const history = useNavigate();
  const [sucursales, setSucursales] = useState([]);
  const [selectedSucursal, setSelectedSucursal] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const sucursalesData = await fetchSucursales();
      setSucursales(sucursalesData);
    };

    fetchData();
  }, []);

  const handleAsignarViajes = () => {
    if (selectedSucursal) {
      history(`/asignar-viajes/${selectedSucursal}`);
    } else {
      alert("Please select a sucursal");
    }
  };

  return (
    <div className="container mx-auto px-4">
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
      <button onClick={handleAsignarViajes}>Asignar Viajes</button>
    </div>
  );
}
