import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Empresa, Cliente } from "../types";

const EmpresaList = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    fetchEmpresas();
  }, []);

  useEffect(() => {
    if (selectedEmpresa) {
      fetchClientesForEmpresa(selectedEmpresa.empresa);
    }
  }, [selectedEmpresa]);

  const fetchEmpresas = () => {
    api
      .get<Empresa[]>("empresas/")
      .then((response) => {
        setEmpresas(response.data);
        setSelectedEmpresa(response.data[0] || null);
      })
      .catch((error) => console.error("Error fetching empresas", error));
  };

  const fetchClientesForEmpresa = (empresaId: number) => {
    api
      .get<Cliente[]>(`clientes/empresa/${empresaId}`)
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => console.error("Error fetching clients", error));
  };

  const handleSelectEmpresa = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const empresaId = parseInt(event.target.value, 10);
    const selected = empresas.find((empresa) => empresa.empresa === empresaId);
    setSelectedEmpresa(selected || null);
  };

  return (
    <div>
      <h1>Company List</h1>
      <select
        onChange={handleSelectEmpresa}
        value={selectedEmpresa?.empresa || ""}
      >
        {empresas.map((empresa) => (
          <option key={empresa.empresa} value={empresa.empresa}>
            {empresa.nombre}
          </option>
        ))}
      </select>
      {selectedEmpresa && (
        <div>
          <h2>Details for {selectedEmpresa.nombre}</h2>
          <h3>Clients</h3>
          {clientes.length > 0 ? (
            <ul>
              {clientes.map((cliente) => (
                <li key={cliente.id_cliente}>
                  {cliente.nombre} - {cliente.telefono}
                </li>
              ))}
            </ul>
          ) : (
            <p>No clients found for this company.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EmpresaList;
