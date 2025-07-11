import { Router, Request, Response, NextFunction } from 'express';
import companyService from '../service/company.service';

const comp = Router();

comp.get("/all", async (req:Request, res:Response) => {
    const result = await companyService.all();

    res.status(result.success ? 200 : 500).json(result)
})

export default comp;