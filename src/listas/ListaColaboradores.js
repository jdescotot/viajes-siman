// ListaColaboradores.js

import React, { useState, useEffect } from "react";
import { fetchColaboradores } from "../crudListas/Crud";

const ListaColaboradores = () => {
  const [colaboradores, setColaboradores] = useState([]);

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

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Colaboradores</h1>
      <ul className="list-disc pl-8">
        {colaboradores.map((colaborador) => (
          <li key={colaborador.id}>
            <p className="text-gray-800">
              {colaborador.name} {colaborador.lastName}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaColaboradores;
