import { Request, Response } from "npm:express@4.18.2";
 
import { Coche,Concesionario, Cliente , Modelo,Error} from "../mongo/types.ts";
import { cochecollection,concesionariocollection,clientecollection } from "../mongo/mongodb.ts";



export const addconcesionario = async ( req:Request , res: Response)=>{

    try {
        
        const concesionario: Concesionario = req.body

        if(!concesionario.coches){
            concesionario.coches = []
        }

        if(!concesionario.nombre || (concesionario.bloqueado === undefined) ){
            const error: Error= {
                code: "Faltan_datos",
                message: "Nombre(string) o bloqueado(boolean), no se ha definido. "
            }
            res.status(400).send(error)
            throw error;
        }
        
        const exist = await concesionariocollection.findOne({nombre: concesionario.nombre})

        if(exist){
            const error: Error= {
                code: "Ya_Existente",
                message: "Ya existe un concesionario con ese nombre. "
            }
            res.status(400).send(error)
            throw error;
        }

        await concesionariocollection.insertOne(concesionario)

        res.status(200).send({
            _id: concesionario._id?.toString(),
            nombre: concesionario.nombre,
            bloqueado: concesionario.bloqueado
        })

        return 

    } catch (error) {
        console.log(error);
        return 
    }
}


export const addcoche = async ( req:Request , res: Response)=>{

    try {
        
        const coche: Coche = {
            matricula: req.body.matricula,
            modelo: req.body.modelo,
            costo: req.body.costo,
        } 

        if(!coche.matricula || !coche.costo  || !coche.modelo  ){
            const error: Error= {
                code: "Faltan_datos",
                message: "matricula(string) , coste(number) o modelo(seat,bmw,ford), no se ha definido. "
            }
            res.status(400).send(error)
            throw error;
        }else if(!(coche.modelo.toString() in Modelo)){
            const error: Error= {
                code: "Modelo_Incorrecto",
                message: "modelo mal definido, las opciones son: seat, bmw o ford. "
            }
            res.status(400).send(error)
            throw error;
        }
        
        const existcoche = await cochecollection.findOne({matricula: coche.matricula})
        
        if(existcoche){
            const error: Error= {
                code: "Ya_Existente",
                message: "Ya existe un coche con esa matricula. "
            }
            res.status(400).send(error)
            throw error;
        }
        
        await cochecollection.insertOne(coche)

        res.status(200).send({
            _id: coche._id?.toString(),
            matricula: coche.matricula,
            modelo: coche.modelo,
            costo: coche.costo,
        })

        return 

    } catch (error) {
        console.log(error);
        return 
    }
}

export const addcliente = async ( req:Request , res: Response)=>{

    try {
        
        const cliente: Cliente = req.body

        if(!cliente.coches){
            cliente.coches = []
        }

        if(!cliente.nombre || !cliente.dinero  ){
            const error: Error= {
                code: "Faltan_datos",
                message: "nombre(string) o dinero(number), no se ha definido. "
            }
            res.status(400).send(error)
            throw error;
        }else if(cliente.dinero<0){
            const error: Error= {
                code: "Numero_negativo",
                message: "Dinero tiene que ser mayor a 0."
            }
            res.status(400).send(error)
            throw error;
        }
        
        const exist = await clientecollection.findOne({nombre: cliente.nombre})

        if(exist){
            const error: Error= {
                code: "Ya_Existente",
                message: "Ya existe un cliente con ese nombre. "
            }
            res.status(400).send(error)
            throw error;
        }

        await clientecollection.insertOne(cliente)

        res.status(200).send({
            _id: cliente._id?.toString(),
            nombre: cliente.nombre,
            dinero: cliente.dinero
        })

        return 

    } catch (error) {
        console.log(error);
        return 
    }
}
