import { Router, Request, Response } from "express";
import clientService from "../service/client.service";

const client = Router();

client.get("/all", async (req: Request, res: Response) => {
    const result = await clientService.allClient();
    
    res.status(result.success ? 200 : 500).json(result);
})

client.get("/serach", async (req: Request, res: Response) => {
    const { cpf } = req.query;
    const uid = String(cpf)

    const result = await clientService.serachClient(uid)

    res.status(result.success ? 200 : 500).json(result)
})

client.get("/serachuid", async (req: Request, res: Response) => {
    const { cpf } = req.query;
    const uid = String(cpf)

    const result = await clientService.serachClientById(uid)

    res.status(result.success ? 200 : 500).json(result)
})

client.put("/update", async (req:Request, res: Response) => {
    const { id, nome, telefone, cpf} = req.body;

    const result = await clientService.updateClient(id, nome, telefone, cpf);

    res.status(result.success ? 200 : 500).json(result);
})

client.post("/create", async (req:Request, res: Response) => {
    const { cpf, name, tel } = req.body;

    const result: any = await clientService.clientCreate(cpf,name,tel);

    res.status(result.success ? 200 : 500).json(result)
})

client.delete("/delete/:id", async (req:Request, res:Response) => {
    const { id } = req.params;

    const uid = Number(id)
    
    const result = await clientService.deleteClient(uid)

    res.status(result.success ? 200 : 500).json(result);
})

export default client