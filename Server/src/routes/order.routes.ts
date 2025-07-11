import { Router, Request, Response } from "express";
import orderService from "../service/order.service";

const order = Router();

order.get("/new", async (req:Request, res:Response) => {
    const result = await orderService.orderNext();

    res.status(result.success ? 200 : 500).json(result)
})

order.post("/create", async (req: Request, res: Response) => {
    try {
        const orderData = req.body;
        const result = await orderService.createOrder(orderData);

        if (result) {
            res.status(result.success ? 200 : 500).json(result);
        } else {
            res.status(500).json({
                success: false,
                error: "Resultado indefinido",
                details: "O resultado da criação do pedido é indefinido.",
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: "Erro interno no servidor",
            details: error.message,
        });
    }
});

order.post("/panel", async (req:Request, res:Response) => {
    const { uuid, status, motivo, nfe, serie, modelo, recibo, chave} = req.body
    const result = await orderService.panelNFC(uuid, status, motivo, nfe, serie, modelo, recibo, chave);

    res.status(result.success ? 201 : 500).json(result)
})

export default order;