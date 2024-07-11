import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import api from "../services/api";
import { MaeFactura, DetFactura } from "../types";
import { formatDate } from "../utils/utils";
import Loader from "./Loader";

const FacturaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [factura, setFactura] = useState<MaeFactura | null>(null);
  const [detalles, setDetalles] = useState<DetFactura[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`facturas/${id}/`)
      .then((response) => {
        setFactura(response.data);
        setDetalles(response.data.detalles || []); // Ensure detalles is an array
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the factura!", error);
        setError("There was an error fetching the factura.");
        setLoading(false);
      });
  }, [id]);

  const handleEditClick = () => {
    navigate(`/factura/${id}/edit`);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (loading) return <Loader />;

  if (error) {
    console.log(error);
  }

  if (!factura) {
    return <div>No factura found.</div>;
  }

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Factura #{factura.numero}
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h3">
            Detalles de la Factura
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Fecha:</strong> {formatDate(factura.fecha_factura)}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Empresa:</strong> {factura.empresa}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Cliente ID:</strong> {factura.id_cliente}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Observaciones:</strong> {factura.observaciones}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Total:</strong> ${Number(factura.total).toFixed(2)}
          </Typography>
          <IconButton onClick={handleEditClick}>
            <EditIcon />
          </IconButton>
        </CardContent>
      </Card>
      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4 }}>
        Detalles de los Productos
      </Typography>
      <List>
        {detalles.map((detalle) => (
          <Card key={detalle.consecutivo} sx={{ mb: 2 }}>
            <ListItem button onClick={handleExpandClick}>
              <ListItemText primary={`Producto ${detalle.id_producto}`} />
              {expanded ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  <strong>Cantidad:</strong> {detalle.cantidad}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Precio:</strong> ${detalle.precio.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Sub Total:</strong> ${detalle.sub_total.toFixed(2)}
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </List>
    </Container>
  );
};

export default FacturaDetail;
