// src/MainPage.tsx
import React from "react";
import { Typography, Button, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Main Dashboard
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button variant="contained" component={Link} to="/empresas">
          View Companies
        </Button>
        <Button variant="contained" component={Link} to="/clientes">
          View Clients
        </Button>
        <Button variant="contained" component={Link} to="/productos">
          View Products
        </Button>
        <Button variant="contained" component={Link} to="/facturas">
          View Invoices
        </Button>
        <Button variant="outlined" component={Link} to="/new-factura">
          Create New Invoice
        </Button>
      </Box>
    </Container>
  );
};

export default MainPage;
