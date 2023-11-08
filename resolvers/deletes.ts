// deno-lint-ignore-file
import { Request, Response } from "npm:express@4.18.2";
import { Error } from "../mongo/types.ts";
import { cochecollection,concesionariocollection,clientecollection } from "../mongo/mongodb.ts";
import { ObjectId } from "https://deno.land/x/web_bson@v0.2.5/mod.ts";

export const deletes = async ( req:Request , res: Response)=>{

    try {

        await clientecollection.deleteMany({})
        await cochecollection.deleteMany({})
        await concesionariocollection.deleteMany({})
        res.status(200).send("listo, BD vaciada.")
    } catch (error) {
        console.log((error));
        return 
    }
    
}

export const delc = async ( req:Request , res: Response)=>{

    try {
        
        const envio = req.params.id



        if(!envio){
            const error: Error= {
                code: "Faltan_datos",
                message: "id, no se ha definido. "
            }
            res.status(400).send(error)
            throw error;
        }
        
        const existcoche = await cochecollection.findOne({_id: new ObjectId(envio)})
        
        if(!existcoche){
            const error: Error= {
                code: "No_Existente",
                message: "No existe un coche con ese id. "
            }
            res.status(400).send(error)
            throw error;
        }else if(existcoche.enventa===true){
           const prop = await concesionariocollection.findOne({_id: new ObjectId(existcoche.direccion)})
            if(prop){
                const coches: string[] = prop.coches.reduce((acc: string[] , elem: string)=>{

                    if(elem===envio){
                        return acc
                    }else{
                        return [...acc,elem]
                    }
                    
                },[])

                await concesionariocollection.updateOne(prop,{
                    $set: {
                        coches: coches
                    }
                    
                })
            }
        }else{
            const prop = await clientecollection.findOne({_id: new ObjectId(existcoche.direccion)})
            if(prop){
                const coches: string[] = prop.coches.reduce((acc: string[] , elem: string)=>{

                    if(elem===envio){
                        return acc
                    }else{
                        return [...acc,elem]
                    }
                    
                },[])

                await clientecollection.updateOne(prop,{
                        $set: {
                            coches: coches
                        }
                    
                })}
        }
        await cochecollection.deleteOne(existcoche)

        res.status(200).send(envio)

        return 

    } catch (error) {
        console.log(error);
        return 
    }
}