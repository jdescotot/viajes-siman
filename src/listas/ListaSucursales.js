// ListaSucursales.js

import React, { useState, useEffect } from "react";
import { fetchSucursales } from "../components/firestoreOperations";

const ListaSucursales = () => {
  const [sucursales, setSucursales] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sucursalesData = await fetchSucursales();
        console.log("Fetched sucursales data:", sucursalesData);
        setSucursales(sucursalesData);
      } catch (error) {
        console.error("Error fetching sucursales data:", error);
      }
    };

    fetchData();
  }, []);

  console.log("Current sucursales state:", sucursales);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Sucursales</h1>
      <ul className="list-disc pl-8">
        {sucursales.map((sucursal) => (
          <li key={sucursal.id}>
            <p className="text-gray-800">{sucursal.sucursalName}</p>
            <p className="text-gray-800">{sucursal.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaSucursales;
