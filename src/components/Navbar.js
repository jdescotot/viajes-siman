import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-200 p-4">
      <ul className="flex justify-between">
        <div className="flex space-x-4">
          <li>
            <Link
              className="text-blue-800 font-semibold hover:text-blue-600"
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="text-blue-800 font-semibold hover:text-blue-600"
              to="/colaborador"
            >
              Colaborador
            </Link>
          </li>
          <li>
            <Link
              className="text-blue-800 font-semibold hover:text-blue-600"
              to="/sucursal"
            >
              Sucursal
            </Link>
          </li>
          <li>
            <Link
              className="text-blue-800 font-semibold hover:text-blue-600"
              to="/viajes"
            >
              Viajes
            </Link>
          </li>
          <li>
            <Link
              className="text-blue-800 font-semibold hover:text-blue-600"
              to="/transportistas"
            >
              Transportistas
            </Link>
          </li>
        </div>
        <div>
          <li>
            <Link
              className="text-blue-800 font-semibold hover:text-blue-600"
              to="/register"
            >
              Register
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}
