import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";
import api from "../services/api";
import { MaeFactura } from "../types";
import { useNavigate } from "react-router-dom";

const NewFactura: React.FC = () => {
  const [empresa, setEmpresa] = useState<number>();
  const [fechaFactura, setFechaFactura] = useState<string>();
  const [idCliente, setIdCliente] = useState<number>();
  const [observaciones, setObservaciones] = useState<string>();
  const [total, setTotal] = useState<number>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

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
        setLoading(false);
        navigate("/facturas");
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.detail);
        } else {
          console.error(
            "There was an error creating the factura!",
            error.message
          );
          setLoading(false);
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Stack alignItems={"center"} sx={{ mt: 8 }} spacing={2}>
        <Typography variant="h5">Crear nueva factura</Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="No. Empresa"
              value={empresa}
              onChange={(e) => setEmpresa(parseInt(e.target.value))}
              required
            />
            <TextField
              label="No. Cliente"
              value={idCliente}
              onChange={(e) => setIdCliente(parseInt(e.target.value))}
              required
            />
            <TextField
              label="Fecha"
              type="date"
              value={fechaFactura}
              onChange={(e) => setFechaFactura(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="Observaciones"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              multiline
              rows={4}
            />
            <TextField
              label="Total"
              type="number"
              value={total}
              onChange={(e) => setTotal(parseInt(e.target.value))}
              required
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button type="submit" variant="contained" color="primary">
              {loading ? <CircularProgress size={24} /> : "Crear factura"}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};

export default NewFactura;
