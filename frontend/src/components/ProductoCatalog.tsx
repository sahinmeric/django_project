import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Producto } from "../types";

const ProductoCatalog: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    api
      .get<Producto[]>("productos/")
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the productos!", error);
      });
  }, []);

  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id_producto}>{producto.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductoCatalog;
