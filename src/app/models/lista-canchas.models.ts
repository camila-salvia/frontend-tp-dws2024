export interface Cancha {
        id: number,
        estado:string,
        canchaClass: {
            id: number,
            precioHora: number,
            tipoCancha: string
      }
    }

export interface CanchaResponse {
  message: string;
  data: Cancha;
}