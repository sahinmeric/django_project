import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { MaeFactura, DetFactura } from "../types";

const FacturaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [factura, setFactura] = useState<MaeFactura | null>(null);
  const [detalles, setDetalles] = useState<DetFactura[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get(`facturas/${id}/`)
      .then((response) => {
        setFactura(response.data);
        setDetalles(response.data.detalles || []); // Ensure detalles is an array
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the factura!", error);
        setError("There was an error fetching the factura.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!factura) {
    return <div>No factura found.</div>;
  }

  const handleEditClick = () => {
    navigate(`/factura/${factura.id_factura}/edit`);
  };

  return (
    <div>
      <h1>Factura Detail</h1>
      <p>Empresa: {factura.empresa}</p>
      <p>Numero: {factura.numero}</p>
      <p>Fecha Factura: {factura.fecha_factura}</p>
      <p>Cliente ID: {factura.id_cliente}</p>
      <p>Observaciones: {factura.observaciones}</p>
      <p>Total: {factura.total}</p>

      <h2>Detalles</h2>
      <ul>
        {detalles.length > 0 ? (
          detalles.map((detalle) => (
            <li key={detalle.consecutivo}>
              <p>Producto: {detalle.id_producto}</p>
              <p>Cantidad: {detalle.cantidad}</p>
              <p>Precio: {detalle.precio}</p>
              <p>Subtotal: {detalle.sub_total}</p>
            </li>
          ))
        ) : (
          <li>No detalles found.</li>
        )}
      </ul>
      <button onClick={handleEditClick}>Edit</button>
    </div>
  );
};

export default FacturaDetail;
