import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Collapse,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import api from "../services/api";
import { Producto } from "../types";
import Loader from "./Loader";

const ProductoCatalog: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    api
      .get<Producto[]>("productos/")
      .then((response) => {
        setProductos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the productos!", error);
        setLoading(false);
      });
  }, []);

  const handleExpandClick = (productoId: number) => {
    setExpanded(expanded === productoId ? null : productoId);
  };

  if (loading) return <Loader />;

  return (
    <Stack alignItems={"center"} sx={{ mt: 6 }} spacing={2}>
      <Stack alignSelf={"center"} maxWidth="md" sx={{ m: 2 }}>
        <Typography variant="h6">PRODUCTOS</Typography>
      </Stack>
      <List>
        {productos.map((producto) => (
          <Card sx={{ mb: 2 }}>
            <ListItem
              onClick={() => handleExpandClick(producto.id_producto)}
              key={`list-item-${producto.id_producto}`}
            >
              <ListItemText primary={producto.nombre} />
              <IconButton>
                {expanded === producto.id_producto ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </IconButton>
            </ListItem>
            <Collapse
              in={expanded === producto.id_producto}
              timeout="auto"
              unmountOnExit
              key={`collapse-${producto.id_producto}`}
            >
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  <strong>ID:</strong> {producto.id_producto}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Empresa:</strong> {producto.empresa}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Producto:</strong> {producto.producto}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Tipo:</strong> {producto.tipo}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Foto:</strong> {producto.fotoproducto}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Fecha de Creación:</strong>{" "}
                  {new Date(producto.fecha_creacion).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Estado:</strong> {producto.estado}
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </List>
    </Stack>
  );
};

export default ProductoCatalog;
