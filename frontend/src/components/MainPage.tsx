// src/MainPage.tsx
import React from "react";
import { Typography, Button, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button variant="contained" component={Link} to="/empresas">
          EMPRESAS
        </Button>
        <Button variant="contained" component={Link} to="/clientes">
          CLIENTES
        </Button>
        <Button variant="contained" component={Link} to="/productos">
          PRODUCTOS
        </Button>
        <Button variant="contained" component={Link} to="/facturas">
          FACTURAS
        </Button>
        <Button variant="outlined" component={Link} to="/new-factura">
          CREAR NUEVA FACTURA
        </Button>
      </Box>
    </Container>
  );
};

export default MainPage;
