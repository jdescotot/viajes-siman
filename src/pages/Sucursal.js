import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createSucursal } from "../components/firestoreOperations";

export default function Sucursal() {
  const [sucursalName, setSucursalName] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sucursalData = {
      sucursalName: sucursalName,
      address: address,
    };

    try {
      const sucursalId = await createSucursal(sucursalData);
      setMessage(`Sucursal creada con ID: ${sucursalId}`);
      setError(null);
    } catch (error) {
      setError("Error creating sucursal");
      setMessage(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-center text-2xl font-extrabold text-gray-900">
          Sucursal
        </h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="sucursalName" className="sr-only">
                Sucursal Name
              </label>
              <input
                type="text"
                id="sucursalName"
                value={sucursalName}
                onChange={(e) => setSucursalName(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Sucursal Name"
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Address"
              />
            </div>
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
          <Link
            to="/lista-sucursales"
            className="text-blue-500 hover:text-blue-700"
          >
            Ver lista de sucursales
          </Link>
        </form>
        {message && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4"
            role="alert"
          >
            <span className="block sm:inline">{message}</span>
          </div>
        )}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}
