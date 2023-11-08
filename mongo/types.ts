import { ObjectId } from "https://deno.land/x/web_bson@v0.2.5/mod.ts";

export enum Modelo {
    seat = "seat",
    ford = "ford", 
    bmw = "bmw"

}

export type Cliente = {
    _id?: ObjectId;
    nombre: string;
    dinero: number;
    coches: string[]
}

export type Concesionario = {
    _id?: ObjectId;
    nombre: string;
    coches: string[];
    bloqueado: boolean;
}

export type Coche = {
    _id?: ObjectId;
    matricula: string;
    modelo: Modelo;
    costo: number;
    enventa?: boolean;
    direccion?: string
}

export type Envio = {
    origen?:string;
    objeto: string | number | boolean;
    destino: string;
}

export type Error = {
    code: string;
    message: string;
}