import { Router, Request, Response} from 'express';
import nfcService from '../service/nfc.service'

const nfc = Router();

nfc.get("/danfe", async (req:Request, res:Response) => {
    const { chave } = req.query

    const chave_nfc = String(chave)

    const result = await nfcService.getDanfe(chave_nfc);

    res.status(result.success ? 200 : 500).json(result)
})

nfc.get("/all", async (req:Request, res:Response) => {
    const result = await nfcService.allNFC()

    res.status(result.success ? 200 : 500).json(result);    
})

export default nfc;