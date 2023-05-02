import React, { useState } from "react";
import { createTransportista } from "../components/firestoreOperations";

export default function Transportistas() {
  const [name, setName] = useState("");
  const [feePerKilometer, setFeePerKilometer] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transportistaData = {
      name: name,
      feePerKilometer: parseFloat(feePerKilometer),
    };

    try {
      const transportistaId = await createTransportista(transportistaData);
      setMessage(`Transportista created with ID: ${transportistaId}`);
    } catch (error) {
      console.error("Error creating transportista", error);
      setMessage("Error creating transportista");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-center text-2xl font-extrabold text-gray-900">
          Transportistas
        </h1>
        {message && <p className="text-center text-green-500">{message}</p>}
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
              <label htmlFor="feePerKilometer" className="sr-only">
                Fee per kilometer
              </label>
              <input
                type="number"
                id="feePerKilometer"
                value={feePerKilometer}
                onChange={(e) => setFeePerKilometer(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Fee per kilometer"
              />
            </div>
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
