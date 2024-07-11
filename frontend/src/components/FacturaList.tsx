import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CircularProgress,
  Stack,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import api from "../services/api";
import { MaeFactura } from "../types";

const FacturaList: React.FC = () => {
  const [facturas, setFacturas] = useState<MaeFactura[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get<MaeFactura[]>("facturas/")
      .then((response) => {
        setFacturas(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the facturas!", error);
        setLoading(false);
      });
  }, []);

  const handleFacturaClick = (facturaId: number) => {
    navigate(`/factura/${facturaId}`);
  };

  const handleEditClick = (facturaId: number) => {
    navigate(`/factura/${facturaId}/edit`);
  };

  if (loading) {
    return (
      <Stack alignItems={"center"} sx={{ mt: 20 }}>
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        FACTURAS
      </Typography>
      <Stack spacing={2}>
        {facturas.map((factura) => (
          <Card key={factura.id_factura}>
            <CardActionArea
              onClick={() => handleFacturaClick(factura.id_factura)}
            >
              <CardContent>
                <Typography variant="h6" component="h3">
                  Factura #{factura.numero}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Fecha:</strong>{" "}
                  {new Date(factura.fecha_factura).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Empresa:</strong> {factura.empresa}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Observaciones:</strong> {factura.observaciones}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Total:</strong> ${Number(factura.total).toFixed(2)}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardContent>
              <IconButton onClick={() => handleEditClick(factura.id_factura)}>
                <EditIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default FacturaList;
