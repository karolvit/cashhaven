import { Router, Request, Response } from 'express';
import cxService from "../service/cx.service";

const cx = Router();

cx.get("/validate", async (req: Request, res: Response) => {
    const { user_cx } = req.query;
    const cx = Number(user_cx)
    const result = await cxService.getCx(cx);

    res.status(result.success ? 200 : 500).json(result);
})

cx.post("/open", async (req: Request, res: Response) => {
    const { user_cx, dinheiro } = req.body;
    const result = await cxService.openCx(user_cx, dinheiro);

    res.status(result.success ? 200 : 500).json(result);
})

cx.post("/forceopen", async (req: Request, res: Response) => {
    const { user_cx, dinheiro } = req.body;
    const result = await cxService.openCx(user_cx, dinheiro);

    res.status(result.success ? 200 : 500).json(result);
})

cx.post("/close", async (req: Request, res: Response) => {
    const { user_cx, credito, debito, pix, dinheiro } = req.body;
    const result = await cxService.closeCx(user_cx, credito, debito, pix, dinheiro);

    res.status(result.success ? 200 : 500).json(result);
})

cx.post("/sangria", async (req:Request, res:Response) => {
    const { user_cx, sang, sd_old } = req.body;
    const result = await cxService.withdrawing(user_cx, sang, sd_old);

    res.status(result.success ? 200 : 500).json(result)
})

export default cx;