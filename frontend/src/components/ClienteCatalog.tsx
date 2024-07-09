import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Cliente } from "../types";

const ClienteCatalog: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    api
      .get<Cliente[]>("clientes/")
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the clientes!", error);
      });
  }, []);

  return (
    <div>
      <h1>Clientes</h1>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id_cliente}>{cliente.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClienteCatalog;
