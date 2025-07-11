import { Router, Request, Response } from "express";
import saleService from "../service/sale.service";

const sale = Router();

sale.post("/forsale", async (req:Request, res: Response) => {
    const { id, venda, inicio, fim} = req.body;

    const result = await saleService.sale(id, venda, inicio, fim);

    res.status(result.success ? 200 : 500).json(result);
})

export default sale