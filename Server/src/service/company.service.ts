import pool from "../database/connection";
import { RowDataPacket } from "mysql2";

async function all() {
    const [result] = await pool.query<RowDataPacket[]>("SELECT * FROM company");

    return {
        success: true,
        message: result
    }
}

export default {
    all
}