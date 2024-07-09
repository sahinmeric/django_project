import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmpresaList from "./components/EmpresaList";
import ClienteCatalog from "./components/ClienteCatalog";
import ProductoCatalog from "./components/ProductoCatalog";
import FacturaList from "./components/FacturaList";
import NewFactura from "./components/NewFactura";
import FacturaDetail from "./components/FacturaDetail";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmpresaList />} />
        <Route path="/empresas" element={<EmpresaList />} />
        <Route path="/clientes" element={<ClienteCatalog />} />
        <Route path="/productos" element={<ProductoCatalog />} />
        <Route path="/facturas" element={<FacturaList />} />
        <Route path="/new-factura" element={<NewFactura />} />
        <Route path="/factura/:id" element={<FacturaDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
