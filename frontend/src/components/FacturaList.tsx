import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent, Stack } from "@mui/material";
import api from "../services/api";
import { MaeFactura } from "../types";
import Loader from "./Loader";

const FacturaList: React.FC = () => {
  const [facturas, setFacturas] = useState<MaeFactura[]>([]);
  const [loading, setLoading] = useState(true);

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
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
};

export default FacturaList;
