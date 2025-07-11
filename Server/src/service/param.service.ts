import pool from "../database/connection";
import { RowDataPacket } from "mysql2";

async function allParams() {
    const query = "SELECT id, name as parametro, value as valor, bit FROM sys";

    const [result] = await pool.query(query);

    return {
        success: true,
        message: result
    }
}

async function updateParams(valor:number, bit:number, id:number) {
    const query = "UPDATE sys SET value = ?, bit = ?  WHERE id = ?";

    const [result] = await pool.query(query, [valor, bit, id]);

    return {
        success: true,
        message: ["Parâmetro atualizado com sucesso"]
    }
}

async function whatsappServer() {
    const [whatsapp] = await pool.query<RowDataPacket[]>("SELECT bit FROM sys WHERE id = 12")
    const whatsappServer = whatsapp[0].bit;

    return {
        bit: whatsappServer
    }
}

export default {
    allParams,
    updateParams,
    whatsappServer
}
