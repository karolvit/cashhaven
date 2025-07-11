import { Router, Request, Response } from "express";
import stockService from "../service/stock.service";

const stock = Router();

stock.get("/all", async (req: Request, res: Response) => {
    const result = await stockService.allStock();

    res.status(result.success ? 200 : 500).json(result)
})

stock.post("/insert", async (req:Request, res: Response) => {
    const {produto, compra, venda, saldo, fornecedor} = req.body;

    const result = await stockService.insertStock(produto, compra, venda, fornecedor, saldo);

    res.status(result.success ? 200 : 500).json(result);
})

stock.post("/update/sd", async (req:Request, res:Response) => {
    const {id, saldo, fornecedor, compra} = req.body;

    const result = await stockService.insertSD(id, saldo, fornecedor, compra);

    res.status(result.success ? 200 : 500).json(result);
})

stock.put("/update/product", async (req:Request, res:Response) => {
    const {nome, venda, id} = req.body;

    const result = await stockService.modifyProduct(nome, venda, id);

    res.status(result.success ? 200 : 500).json(result);
})

stock.delete("/delete/:id", async (req:Request, res:Response) => {
    const { id } = req.params;
    const pid = Number(id);

    const result = await stockService.deleteProduct(pid)

    res.status(result.success ? 200 : 500).json(result)
})

stock.get("/serach/id", async (req:Request, res:Response) => {
    const { id } = req.query;

    const pid = Number(id);

    const result = await stockService.serachID(pid)

    res.status(result.success ? 200 : 500).json(result);
})

stock.get("/serach/name", async (req:Request, res:Response) => {
    const { nome } = req.query;
    
    const name = String(nome)

    const result = await stockService.serachName(name)

    res.status(result.success ? 200 : 500).json(result);
})

export default stock