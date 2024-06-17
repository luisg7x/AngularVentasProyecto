import { Concepto } from "./concepto";

export interface Venta{
    idCliente: number;
    conceptos: Concepto[];
}