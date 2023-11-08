// deno-lint-ignore-file no-unused-vars
import express, {Response,Request} from "npm:express@4.18.2";
import { addcliente, addcoche, addconcesionario } from "../resolvers/post.ts";
import { cochescliente, getbase, cochesconcesionario, clientes, concesionarios } from "../resolvers/gets.ts";
import { bloqueo, envio, masdinero, transpaso, venta } from "../resolvers/puts.ts";
import { delc, deletes } from "../resolvers/deletes.ts";


const app = express();
app.use(express.json())


app.get("/",getbase)
.get("/Concesionarios",concesionarios)
.get("/Clientes",clientes)
.get("/cochesConcesionario/:id",cochesconcesionario)
.get("/cochesCliente/:id",cochescliente)
.post("/addconcesionario",addconcesionario)
.post("/addcoche",addcoche)
.post("/addcliente",addcliente)
.put("/envio",envio)
.put("/venta",venta)
.put("/transpaso",transpaso)
.put("/dinero",masdinero)
.put("/bloqueo",bloqueo)
.delete("/del",deletes)
.delete("/del/:id",delc)



app.listen(8000, () => {
  console.log("Server is running on port 8000\n");
});


