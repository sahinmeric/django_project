import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Empresa } from "../types";

const EmpresaList: React.FC = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);

  useEffect(() => {
    api
      .get<Empresa[]>("empresas/")
      .then((response) => {
        setEmpresas(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the empresas!", error);
      });
  }, []);

  return (
    <div>
      <h1>Empresas</h1>
      <ul>
        {empresas.map((empresa) => (
          <li key={empresa.empresa}>{empresa.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default EmpresaList;
