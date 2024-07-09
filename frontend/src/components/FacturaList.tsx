import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { MaeFactura } from "../types";

const FacturaList: React.FC = () => {
  const [facturas, setFacturas] = useState<MaeFactura[]>([]);

  useEffect(() => {
    api
      .get("facturas/")
      .then((response) => {
        setFacturas(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the facturas!", error);
      });
  }, []);

  return (
    <div>
      <h1>Facturas List</h1>
      <ul>
        {facturas.map((factura) => (
          <li key={factura.id_factura}>
            <Link to={`/factura/${factura.id_factura}`}>
              {factura.numero} - {factura.fecha_factura} - {factura.total}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/new-factura">Create New Factura</Link>
    </div>
  );
};

export default FacturaList;
