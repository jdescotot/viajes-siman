import React, { useState, useEffect } from "react";
import AsignarColaborador from "../components/AsignarColaborador";
import {
  createColaborador,
  fetchColaboradores,
} from "../crud/colaboradoresFirestore";
import { fetchSucursales } from "../crud/sucursalesFirestore";

export default function Colaborador() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [sucursales, setSucursales] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      const sucursalesData = await fetchSucursales();
      setSucursales(sucursalesData);

      const colaboradoresData = await fetchColaboradores();
      setColaboradores(colaboradoresData);
    };

    fetchAllData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const colaboradorData = {
      name: name,
      lastName: lastName,
      address: address,
    };

    try {
      const colaboradorId = await createColaborador(colaboradorData);
      setMessage(`Colaborador creado con ID: ${colaboradorId}`);
      setError(null);
    } catch (error) {
      setError("Error creating colaborador");
      setMessage(null);
    }
  };

  return (
    <>
      {!showAssignmentForm && (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <h1 className="text-center text-2xl font-extrabold text-gray-900">
              Colaborador
            </h1>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="sr-only">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Last Name"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="sr-only">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Address"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Crear nuevo Colaborador
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => setShowAssignmentForm(!showAssignmentForm)}
                className="text-indigo-600 hover:text-indigo-800 focus:outline-none focus:underline"
              >
                Asignar Colaborador a Sucursal
              </button>
            </div>

            {message && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative my-6">
                {message}
              </div>
            )}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-6">
                {error}
              </div>
            )}
          </div>
        </div>
      )}

      {showAssignmentForm && (
        <AsignarColaborador
          sucursales={sucursales}
          colaboradores={colaboradores}
          onToggleAssignmentForm={() =>
            setShowAssignmentForm(!showAssignmentForm)
          }
        />
      )}
    </>
  );
}
