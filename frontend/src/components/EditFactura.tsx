import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { MaeFactura, DetFactura } from "../types";
import { formatDate } from "../utils/utils";

const EditFactura: React.FC = () => {
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

  const handleInputChange = (field: string, value: any) => {
    if (factura) {
      setFactura({ ...factura, [field]: value });
    }
  };

  const handleDetalleChange = (index: number, field: string, value: any) => {
    const newDetalles = [...detalles];
    newDetalles[index] = { ...newDetalles[index], [field]: value };
    setDetalles(newDetalles);
  };

  const handleSave = () => {
    if (factura) {
      api
        .put(`facturas/${factura.id_factura}/`, factura)
        .then((response) => {
          detalles.forEach((detalle) => {
            api
              .put(`detalle-facturas/${detalle.consecutivo}/`, detalle)
              .then(() => {
                console.log("Detalle updated successfully");
              })
              .catch((error) => {
                console.error(
                  "There was an error updating the detalle!",
                  error
                );
              });
          });
          navigate(`/factura/${factura.id_factura}`);
        })
        .catch((error) => {
          console.error("There was an error updating the factura!", error);
        });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!factura) {
    return <div>No factura found.</div>;
  }

  return (
    <div>
      <h1>Edit Factura</h1>
      <label>
        Numero:
        <input
          type="number"
          value={factura.numero}
          onChange={(e) => handleInputChange("numero", e.target.value)}
        />
      </label>
      <label>
        Fecha Factura:
        <input
          type="date"
          value={formatDate(factura.fecha_factura)}
          onChange={(e) => handleInputChange("fecha_factura", e.target.value)}
        />
      </label>
      <label>
        Cliente ID:
        <input
          type="number"
          value={factura.id_cliente}
          onChange={(e) => handleInputChange("id_cliente", e.target.value)}
        />
      </label>
      <label>
        Observaciones:
        <textarea
          value={factura.observaciones}
          onChange={(e) => handleInputChange("observaciones", e.target.value)}
        />
      </label>
      <label>
        Total:
        <input
          type="number"
          value={factura.total}
          onChange={(e) => handleInputChange("total", e.target.value)}
        />
      </label>

      <h2>Detalles</h2>
      <ul>
        {detalles.length > 0 ? (
          detalles.map((detalle, index) => (
            <li key={detalle.consecutivo}>
              <label>Producto: {detalle.id_producto}</label>
              <input
                type="number"
                value={detalle.cantidad}
                onChange={(e) =>
                  handleDetalleChange(index, "cantidad", e.target.value)
                }
              />
              <input
                type="number"
                value={detalle.precio}
                onChange={(e) =>
                  handleDetalleChange(index, "precio", e.target.value)
                }
              />
              <input type="number" value={detalle.sub_total} readOnly />
            </li>
          ))
        ) : (
          <li>No detalles found.</li>
        )}
      </ul>
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default EditFactura;
