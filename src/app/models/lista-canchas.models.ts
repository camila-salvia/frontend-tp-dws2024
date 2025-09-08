export interface Cancha {
        id: number,
        estado:string,
        precioHora: number,
        tipoCancha: string
    }

export interface CanchaResponse {
  message: string;
  data: Cancha;
}