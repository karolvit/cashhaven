import { Router, Request, Response} from 'express'
import intWppService from "../service/int.wpp.service";

const intWpp = Router();

intWpp.post("/welcome", async (req:Request, res:Response) => {
    const {telefone} = req.body;

    const result = await intWppService.welcomeMessage(telefone);

    res.status(result.success ? 200 : 500).json(result)
});

intWpp.post("/cashback", async (req:Request, res:Response) => {
    const { id } = req.body;

    const result = await intWppService.clientPoint(id);

    res.status(result.success ? 200 : 500).json(result);
})

export default intWpp;