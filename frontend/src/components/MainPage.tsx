import React from "react";
import { Link } from "react-router-dom";

const MainPage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Our Management System</h1>
      <nav>
        <ul>
          <li>
            <Link to="/empresas">List Companies</Link>
          </li>
          <li>
            <Link to="/clientes">List Clients</Link>
          </li>
          <li>
            <Link to="/productos">List Products</Link>
          </li>
          <li>
            <Link to="/facturas">List Invoices</Link>
          </li>
          <li>
            <Link to="/new-factura">Create New Invoice</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MainPage;
