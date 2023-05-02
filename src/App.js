import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Colaborador from "./pages/Colaborador";
import Sucursal from "./pages/Sucursal";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Viajes from "./pages/Viajes";
import Transportistas from "./pages/Transportistas";
import ListaSucursales from "./listas/ListaSucursales";
import ListaColaboradores from "./listas/ListaColaboradores";
import AsignarViajes from "./components/AsiganrViajes";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/colaborador" element={<Colaborador />} />
        <Route path="/sucursal" element={<Sucursal />} />
        <Route path="/viajes" element={<Viajes />} />
        <Route path="/transportistas" element={<Transportistas />} />
        <Route path="/lista-sucursales" element={<ListaSucursales />} />
        <Route path="/lista-coalboradores" element={<ListaColaboradores />} />
        <Route path="/asignar-viajes/:sucursalId" element={<AsignarViajes />} />
      </Routes>
    </Router>
  );
}
