import { Router, Request, Response } from 'express';
import reportService from '../service/reports.service';

const reports = Router();

reports.get("/stock", async (req: Request, res: Response) => {
    const result = await reportService.stockAlert();

    res.status(result.success ? 200 : 500).json(result)
})

reports.get("/vendas", async (req:Request, res:Response) => {
    const result = await reportService.vendasDia();

    res.status(result.success ? 200 : 500).json(result);
})

reports.get("/sale", async (req:Request, res:Response) => {
    const { days } = req.query
    const day = Number(days)
    const result = await reportService.saleResum(day);

    res.status(result.success ? 200 : 500).json(result)
})

reports.get("/diario", async (req:Request, res:Response) => {
    const { user_cx } = req.query;
    const opcx = Number(user_cx)
    const result = await reportService.relDiario(opcx);

    res.status(result.success ? 200 : 500).json(result)
})

reports.get("/ticket", async (req:Request, res:Response) => {
    const { data_inicial, data_final } = req.query;

    const date_init = String(data_inicial);
    const date_finnaly = String(data_final);

    const result =  await reportService.ticketMedio(date_init, date_finnaly);

    res.status(result.success ? 200 : 500).json(result);
})

reports.get("/precificacao", async (req:Request, res:Response) => {
    const result = await reportService.acaiXcomplementos();

    res.status(result.success ? 200 : 500).json(result)
})

export default reports;