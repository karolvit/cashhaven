import { Router, Request, Response } from "express";
import userService from "../service/user.service";

const user = Router();

user.get("/all", async (req: Request, res: Response) => {
    try {
        const result = await userService.allUser();

        result.success
            ? res.status(200).json(result)
            : res.status(500).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: "Erro interno" });
    }
});

user.delete("/del/:uid", async (req: Request, res: Response) => {
    try {
        const { uid } = req.params;

        const id = parseInt(uid)

        const result = await userService.dellUser(id);
        res.status(result.success ? 200 : 500).json(result);
    } catch (error) {}
});

user.put("/update", async (req: Request, res:Response) => {
    const {nome, cargo, adm, senha, user, id} = req.body;
    const result = await userService.editUser(nome, cargo, adm, senha, user, id)

    res.status(result.success ? 200 : 500).json(result)
})

export default user;