import React, { useEffect, useState } from "react";
import {
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Grid,
  Paper,
} from "@mui/material";
import api from "../services/api";
import { Empresa, Cliente } from "../types";
import Loader from "./Loader";

const EmpresaList: React.FC = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmpresa, setSelectedEmpresa] = useState<number | string>("");
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    api
      .get<Empresa[]>("empresas/")
      .then((response) => {
        setEmpresas(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the empresas!", error);
        setLoading(false);
      });
  }, []);

  const handleEmpresaChange = (event: SelectChangeEvent<string | number>) => {
    const empresaId = event.target.value as number;
    setSelectedEmpresa(empresaId);
    api
      .get<Cliente[]>(`clientes/empresa/${empresaId}/`)
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the clients!", error);
      });
  };

  if (loading) return <Loader />;

  return (
    <Stack alignItems={"center"} sx={{ mt: 6 }} spacing={2}>
      <Stack>
        <FormControl sx={{ width: 300 }}>
          <InputLabel id="empresa-select-label" variant="standard">
            Empresa
          </InputLabel>
          <Select
            labelId="empresa-select-label"
            id="empresa-select"
            value={selectedEmpresa}
            label="Empresa"
            onChange={handleEmpresaChange}
          >
            {empresas.map((empresa) => (
              <MenuItem key={empresa.empresa} value={empresa.empresa}>
                {empresa.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      {selectedEmpresa && (
        <Stack maxWidth="md" sx={{ mt: 8 }}>
          <Stack alignSelf={"center"} m={2}>
            <Typography variant="h6">CLIENTES</Typography>
          </Stack>
          <Grid container spacing={3} justifyContent="center">
            {clientes.map((cliente) => (
              <Grid item xs={12} sm={6} md={4} key={cliente.id_cliente}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    height: 350,
                  }}
                >
                  <Typography variant="h6">{cliente.nombre}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>ID:</strong> {cliente.id_cliente}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Tipo:</strong> {cliente.tipo}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Teléfono:</strong> {cliente.telefono}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Correo:</strong> {cliente.correo.toLowerCase()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Dirección:</strong> {cliente.direccion}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Página Web:</strong> {cliente.paginaweb}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Fecha de Creación:</strong>{" "}
                    {new Date(cliente.fecha_creacion).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Estado:</strong> {cliente.estado}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Stack>
      )}
    </Stack>
  );
};

export default EmpresaList;
