import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { MaeFactura } from "../types";

const NewFactura: React.FC = () => {
  const [empresa, setEmpresa] = useState<number>();
  const [fechaFactura, setFechaFactura] = useState<string>();
  const [idCliente, setIdCliente] = useState<number>();
  const [observaciones, setObservaciones] = useState<string>();
  const [total, setTotal] = useState<number>();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newFactura: Partial<MaeFactura> = {
      empresa,
      fecha_factura: fechaFactura,
      id_cliente: idCliente,
      observaciones,
      total,
    };

    api
      .post("facturas/", newFactura)
      .then((response) => {
        console.log("Factura created successfully:", response.data);
        navigate("/facturas");
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error response:", error.response);
          console.error("Error data:", error.response.data);
          console.error("Error status:", error.response.status);
        } else {
          console.error(
            "There was an error creating the factura!",
            error.message
          );
        }
      });
  };

  return (
    <div>
      <h1>Create New Factura</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Empresa:
          <input
            type="number"
            value={empresa}
            onChange={(e) => setEmpresa(Number(e.target.value))}
          />
        </label>
        <br />
        <br />
        <label>
          Fecha Factura:
          <input
            type="date"
            value={fechaFactura}
            onChange={(e) => setFechaFactura(e.target.value)}
          />
        </label>
        <br />
        <label>
          Cliente ID:
          <input
            type="number"
            value={idCliente}
            onChange={(e) => setIdCliente(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          Observaciones:
          <textarea
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
          />
        </label>
        <br />
        <label>
          Total:
          <input
            type="number"
            value={total}
            onChange={(e) => setTotal(Number(e.target.value))}
          />
        </label>
        <button type="submit">Create Factura</button>
      </form>
    </div>
  );
};

export default NewFactura;
