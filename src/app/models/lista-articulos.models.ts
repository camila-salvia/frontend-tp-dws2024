export interface Articulo {
  id: number;
  type: string;
  color: string;
  talle: string;
  marca: string;
  size: string;
  articuloClass: {
    id: number;
    cantDisponible: number;
    estado: string;
  };
}
