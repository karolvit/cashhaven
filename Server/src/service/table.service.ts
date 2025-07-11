import pool from "../database/connection";

interface Pedido {
    tableid: number,
    uid: number,
    prodno: number,
    unino: number,
    valor_unit: number,
    valor_total: number,
    bit: number
}

async function allTables() {
    const query = "SELECT * FROM tables";
    const [result] = await pool.query(query);

console.log(result);

    return {
        success: true,
        message: result
    };
}

async function insertTable(id: number, referencia: string) {
    try {
        const query = "INSERT INTO tables (id, referencia, t1, t2) VALUES (?, ?, 1, 0)";
        const [result] = await pool.query(query, [id, referencia]);

        return {
            success: true,
            message: ["Mesa cadastrada com sucesso"]
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: error
        }
    }
}

async function deletTable(uid: number) {
    const query = "DELETE FROM tables WHERE id = ?";
    const [result] = await pool.query(query, [uid]);

    return {
        success: true,
        message: ["Mesa excluída com sucesso"]
    };
}

async function insertTablePed(pedidos: Pedido[]) {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const query = `INSERT INTO tableped (tableid, id_client, prodno, unino, valor_unit, valor_total, bit) 
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;

        for (const pedido of pedidos) {
            const { tableid, uid, prodno, unino, valor_unit, valor_total, bit } = pedido;
            await connection.query(query, [tableid, uid, prodno, unino, valor_unit, valor_total, bit]);

            if (bit == 1) {
                const query = "UPDATE tables SET t2 = 1 WHERE id = ?";
                const [result] = await pool.query(query, [tableid])
            }
        }

        await connection.commit();
        return {
            success: true,
            message: 'Pedidos inseridos com sucesso.'
        };
    } catch (error) {
        if (connection) {
            await connection.rollback();
        }
        return {
            success: false,
            error: error
        };
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

async function pedTable() {
    const query = "SELECT tableid, id_client, stock.product, prodno, unino, valor_unit, valor_total, bit FROM tableped INNER JOIN stock ON stock.id = tableped.prodno WHERE bit = 1";
    const [result] = await pool.query(query);

    return {
        success: true,
        message: result
    };
}

export default {
    allTables,
    insertTable,
    deletTable,
    insertTablePed,
    pedTable
};
