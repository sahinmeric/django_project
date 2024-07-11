import React, { useEffect, useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Card,
  CardContent,
  IconButton,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import api from "../services/api";
import { Cliente } from "../types";
import Loader from "./Loader";

const ClienteCatalog: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    api
      .get<Cliente[]>("clientes/")
      .then((response) => {
        setClientes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the clients!", error);
        setLoading(false);
      });
  }, []);

  const handleExpandClick = (clienteId: number) => {
    setExpanded(expanded === clienteId ? null : clienteId);
  };

  if (loading) return <Loader />;

  return (
    <Stack alignItems={"center"} sx={{ mt: 6 }} spacing={2}>
      <Stack alignSelf={"center"} maxWidth="md" sx={{ m: 2 }}>
        <Typography variant="h6">CLIENTES</Typography>
      </Stack>
      <List>
        {clientes.map((cliente) => (
          <Card key={cliente.id_cliente} sx={{ mb: 2 }}>
            <ListItem onClick={() => handleExpandClick(cliente.id_cliente)}>
              <ListItemText primary={cliente.nombre} />
              <IconButton>
                {expanded === cliente.id_cliente ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </IconButton>
            </ListItem>
            <Collapse
              in={expanded === cliente.id_cliente}
              timeout="auto"
              unmountOnExit
            >
              <CardContent>
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
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </List>
    </Stack>
  );
};

export default ClienteCatalog;
