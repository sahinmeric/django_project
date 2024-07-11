export interface Empresa {
  empresa: number;
  nombre: string;
  estado: string;
}

export interface Cliente {
  id_cliente: number;
  empresa: number;
  cliente: number;
  tipo: string;
  nombre: string;
  telefono: string;
  correo: string;
  direccion: string;
  paginaweb: string;
  fecha_creacion: string;
  estado: string;
}

export interface Producto {
  id_producto: number;
  empresa: number;
  producto: number;
  nombre: string;
  tipo: string;
  fotoproducto: string;
  fecha_creacion: string;
  estado: string;
}

export interface MaeFactura {
  id_factura: number;
  empresa: number;
  cliente: number;
  numero: number;
  fecha_factura: string;
  id_cliente: number;
  observaciones: string;
  total: number;
  fecha_auditoria: string;
}

export interface DetFactura {
  id_factura: number;
  empresa: number;
  consecutivo: number;
  id_producto: number;
  cantidad: number;
  precio: number;
  sub_total: number;
}
