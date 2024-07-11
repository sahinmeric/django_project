import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Stack,
  IconButton,
} from "@mui/material";
import api from "../services/api";
import { MaeFactura } from "../types";
import Loader from "./Loader";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

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

  const handleEditClick = (id: number) => {
    navigate(`/factura/${id}/edit`);
  };

  if (loading) return <Loader />;

  return (
    <Stack alignItems={"center"} sx={{ mt: 6 }} spacing={2}>
      <Stack alignSelf={"center"} maxWidth="md" sx={{ m: 2 }}>
        <Typography variant="h6">FACTURAS</Typography>
      </Stack>
      <Stack alignContent={"center"} spacing={2}>
        {facturas.map((factura) => (
          <Card key={factura.id_factura} sx={{ mb: 2, width: 300 }}>
            <CardContent>
              <Stack>
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
                  <strong>Total:</strong> ${factura.total}
                </Typography>
                <Stack alignItems={"center"}>
                  <IconButton
                    onClick={() => handleEditClick(factura.id_factura)}
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
};

export default FacturaList;
