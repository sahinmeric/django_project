import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Stack,
} from "@mui/material";
import api from "../services/api";
import { MaeFactura } from "../types";
import { formatDate } from "../utils/utils";

const EditFactura: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [factura, setFactura] = useState<MaeFactura | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`facturas/${id}/`)
      .then((response) => {
        setFactura(response.data);
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

  const handleSave = () => {
    if (factura) {
      api
        .put(`facturas/${factura.id_factura}/`, factura)
        .then(() => {
          navigate(`/facturas`);
        })
        .catch((error) => {
          console.error("There was an error updating the factura!", error);
        });
    }
  };

  if (loading) {
    return (
      <Stack alignItems={"center"} sx={{ mt: 20 }}>
        <CircularProgress />
      </Stack>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!factura) {
    return <div>No factura found.</div>;
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Edit Factura
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Fecha Factura"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formatDate(factura.fecha_factura)}
          onChange={(e) => handleInputChange("fecha_factura", e.target.value)}
        />
        <TextField
          label="Empresa"
          type="number"
          value={factura.empresa}
          onChange={(e) => handleInputChange("empresa", e.target.value)}
        />
        <TextField
          label="Observaciones"
          multiline
          rows={4}
          value={factura.observaciones}
          onChange={(e) => handleInputChange("observaciones", e.target.value)}
        />
        <TextField
          label="Total"
          type="number"
          value={factura.total}
          onChange={(e) => handleInputChange("total", e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Stack>
    </Container>
  );
};

export default EditFactura;
