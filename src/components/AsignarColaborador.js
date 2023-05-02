// AsignarColaborador.js
import React, { useState } from "react";
import { assignColaboradorToSucursal } from "../components/firestoreOperations";

export default function AsignarColaborador({
  sucursales,
  colaboradores,
  onToggleAssignmentForm,
}) {
  const [selectedSucursal, setSelectedSucursal] = useState("");
  const [selectedColaborador, setSelectedColaborador] = useState("");
  const [distance, setDistance] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleAssignmentSubmit = async (e) => {
    e.preventDefault();

    if (distance >= 50) {
      setError("la distancia debe ser menor a 50 Kilometros");
      setMessage(null);
      return;
    }

    try {
      await assignColaboradorToSucursal(
        selectedColaborador,
        selectedSucursal,
        distance
      );
      setMessage(`Colaborador assignado a Sucursal`);
      setError(null);
    } catch (error) {
      setError("Error assignando Colaborador a Sucursal");
      setMessage(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-center text-2xl font-extrabold text-gray-900">
          Assignar Colaborador to Sucursal
        </h1>
        {message && <p className="text-center text-green-500">{message}</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <form onSubmit={handleAssignmentSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="sucursal" className="sr-only">
                Sucursal
              </label>
              <select
                id="sucursal"
                value={selectedSucursal}
                onChange={(e) => setSelectedSucursal(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                <option value="">seleccione una sucursal</option>
                {sucursales.map((sucursal) => (
                  <option key={sucursal.id} value={sucursal.id}>
                    {sucursal.sucursalName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="colaborador" className="sr-only">
                Colaborador
              </label>
              <select
                id="colaborador"
                value={selectedColaborador}
                onChange={(e) => setSelectedColaborador(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                <option value="">Select a colaborador</option>
                {colaboradores.map((colaborador) => (
                  <option key={colaborador.id} value={colaborador.id}>
                    {colaborador.name} {colaborador.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="distance" className="sr-only">
                Distancia a Sucursal
              </label>
              <input
                type="number"
                id="distance"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Distancia a Sucursal"
              />
            </div>
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Assignar Colaborador a Sucursal
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={onToggleAssignmentForm}
            className="text-indigo-600 hover:text-indigo-800 focus:outline-none focus:underline"
          >
            Crear Nuevo Colaborador
          </button>
        </div>
        {message && <p className="text-center text-green-500">{message}</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
}
