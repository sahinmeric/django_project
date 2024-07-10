import React from "react";
import { Routes, Route } from "react-router-dom";
import EmpresaList from "./components/EmpresaList";
import ClienteCatalog from "./components/ClienteCatalog";
import ProductoCatalog from "./components/ProductoCatalog";
import FacturaList from "./components/FacturaList";
import NewFactura from "./components/NewFactura";
import FacturaDetail from "./components/FacturaDetail";
import EditFactura from "./components/EditFactura";
import MainPage from "./components/MainPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/empresas" element={<EmpresaList />} />
      <Route path="/clientes" element={<ClienteCatalog />} />
      <Route path="/productos" element={<ProductoCatalog />} />
      <Route path="/facturas" element={<FacturaList />} />
      <Route path="/new-factura" element={<NewFactura />} />
      <Route path="/factura/:id" element={<FacturaDetail />} />
      <Route path="/factura/:id/edit" element={<EditFactura />} />
    </Routes>
  );
};

export default App;
