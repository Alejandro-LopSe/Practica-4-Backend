// deno-lint-ignore-file no-unused-vars
import { Error} from "../mongo/types.ts";
import { cochecollection,concesionariocollection,clientecollection } from "../mongo/mongodb.ts";
//import { doexist, mustbeanumber } from "./funciones.ts";
import { Request, Response } from "npm:express@4.18.2";
import { ObjectId } from "https://deno.land/x/web_bson@v0.2.5/mod.ts";


export const getbase = (req: Request, res: Response) =>{
    res.status(200).send({
        estado: "OK, Informacion: ",
        metodos_post: [{
            path: "/addconcesionario" ,
            uso: "Añadir concesionario."
        },{
            path: "/addcoche" ,
            uso: "Añadir coche."
        },{
            path: "/addcliente" ,
            uso: "Añadir cliente."
        }],
        metodos_gets: [{
            path: "/cochesConcesionario/:id" ,
            uso: "Coches del concesionario."
        },{
            path: "/cochesCliente/:id" ,
            uso: "Coches del cliente."
        },{
            path: "/Concesionarios" ,
            uso: "Todos los concesionarios."
        },{
            path: "/Clientes" ,
            uso: "Todos los clientes."
        }],
        metodos_puts: [{
            path: "/envio" ,
            uso: "Enviar coche a concesionario o trasladarlo de uno  a otro."
        },{
            path: "/venta" ,
            uso: "Venta de coche."
        },{
            path: "/transpaso" ,
            uso: "Transpasar coche entre clientes."
        },{
            path: "/dinero" ,
            uso: "Añadir dinero."
        },{
            path: "/bloqueo" ,
            uso: "Bloquear o desbloquear concesionario."
        }],
        metodos_deletes: [{
            path: "/del" ,
            uso: "Vacia todas las colecciones."
        },{
            path: "/del/:id" ,
            uso: "Elimina un coche este donde este."
        }],
    })
}

export const cochesconcesionario = async (req:Request , res: Response)=>{
    
    try {


        const id: string = req.params.id
        
        if(!(id.length===24)){
            const error: Error= {
                code: "No_Valido",
                message: "id debe tener 24 caracteres. "
            }
            res.status(400).send(error)
            throw error;
        }
        

        const exist = await concesionariocollection.findOne({_id: new ObjectId(id)})

        if(exist){
            res.status(200).send(exist.coches)
            return
        }else{
            const error: Error= {
                code: "No_Encontrado",
                message: "No se encuentra un concesionaro con ese id. "
            }
            res.status(400).send(error)
            throw error;
        }
        
    } catch (error) {
        console.log(error);
        return
    }
    
     
}
export const cochescliente = async (req:Request , res: Response)=>{
    
    try {


        const id = req.params.id
        
        if(!(id.length===24)){
            const error: Error= {
                code: "No_Valido",
                message: "id debe tener 24 caracteres. "
            }
            res.status(400).send(error)
            throw error;
        }

        const exist= await clientecollection.findOne( {_id: new ObjectId(id)})

        if(exist){
            res.status(200).send(exist.coches)
            return
        }else{
            const error: Error= {
                code: "No_Encontrado",
                message: "No se encuentra un cliente con ese id. "
            }
            res.status(400).send(error)
            throw error;
        }
        
    } catch (error) {
        console.log(error);
        return
    }
    
     
}

export const concesionarios = async (req:Request , res: Response)=>{
    
    try {

        const exist= await concesionariocollection.find({}).toArray()

        if(exist){
            res.status(200).send(exist)
            return
        }else{
            const error: Error= {
                code: "Fallo_generico",
                message: "Fallo al obtener todos los concesionarios."
            }
            res.status(400).send(error)
            throw error;
        }
        
    } catch (error) {
        console.log(error);
        return
    }
    
     
}
export const clientes = async (req:Request , res: Response)=>{
    
    try {

        const exist= await clientecollection.find({}).toArray()

        if(exist){
            res.status(200).send(exist)
            return
        }else{
            const error: Error= {
                code: "Fallo_generico",
                message: "Fallo al obtener todos los concesionarios."
            }
            res.status(400).send(error)
            throw error;
        }
        
    } catch (error) {
        console.log(error);
        return
    }
    
     
}