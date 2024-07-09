import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { MaeFactura } from "../types";

const FacturaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [factura, setFactura] = useState<MaeFactura | null>(null);

  useEffect(() => {
    api
      .get(`facturas/${id}/`)
      .then((response) => {
        setFactura(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the factura!", error);
      });
  }, [id]);

  if (!factura) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Factura Detail</h1>
      <p>Empresa: {factura.empresa}</p>
      <p>Numero: {factura.numero}</p>
      <p>Fecha Factura: {factura.fecha_factura}</p>
      <p>Cliente ID: {factura.id_cliente}</p>
      <p>Observaciones: {factura.observaciones}</p>
      <p>Total: {factura.total}</p>
    </div>
  );
};

export default FacturaDetail;
