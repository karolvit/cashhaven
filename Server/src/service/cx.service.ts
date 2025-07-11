import pool from "../database/connection";
import { RowDataPacket } from "mysql2";


async function getCx(cx: number) {
    const [queryDiaAnterior] = await pool.query<RowDataPacket[]>(
        "SELECT bit, DATE_FORMAT(date, '%d/%m/%Y') as date FROM cx WHERE date < CURDATE() ORDER BY date DESC LIMIT 1"
    );
    const diaAnterior = queryDiaAnterior[0]?.bit ?? "dia anterior em aberto";
    const dataAnterior = queryDiaAnterior[0]?.date ?? "sem informações";
    const [diaAtual] = await pool.query<RowDataPacket[]>(
        "SELECT bit FROM cx WHERE date = curdate()"
    );
    const hoje = diaAtual[0]?.bit ?? "sem movimentação";

    if (cx == 1) {
        return {
            success: true,
            message: "Bem vindo, ADM",
        };
    }

    if (hoje === "sem movimentação") {
        if (diaAnterior === 1 && dataAnterior !== "sem informações") {
            return {
                success: true,
                message: `Caixa do dia ${dataAnterior} em aberto`,
            };
        } else {
            return {
                success: true,
                message: "Seja bem vindo ao CashHaven, realize a sua primeira abertura de caixa",
                s0: 0
            };
        }
    } else {
        const [estadoAtualCaixa] = await pool.query<RowDataPacket[]>(
            "SELECT bit, user_cx FROM cx WHERE date = curdate()"
        );
        const ultimo_operador = estadoAtualCaixa[0]?.user_cx;
        const ultimo_estado = estadoAtualCaixa[0]?.bit;

        if (cx !== ultimo_operador && ultimo_estado === 1) {
            return {
                success: false,
                error: `Caixa de ${ultimo_operador} já se encontra em aberto, deseja fechar?`,
		s0:0
            };
        } else {
            return {
                success: true,
                message: "É necessário abrir o caixa para logar no sistema"
            }
        }
    }
    return {
        success: false,
        error: "Não foi possível validar o caixa",
    };
}

async function openCx(user_cx: number, dinheiro: number) {
    if (user_cx == 1) {
        return {
            success: true,
            message: "Bem vindo, ADM"
        };
    }

    const [queryUltimoUsuario] = await pool.query<RowDataPacket[]>("SELECT bit FROM cx WHERE date < CURDATE() AND bit = 1 ORDER BY date DESC LIMIT 1");

    const ultimoOperador = queryUltimoUsuario.length > 0 ? queryUltimoUsuario[0].bit : 0;

    if (ultimoOperador == 0) {
        const query = "INSERT INTO cx (user_cx, credito, dinheiro, pix, debito, date, time, bit) VALUES (?, 0, ?, 0, 0, curdate(), curtime(), 1)";
        const [result] = await pool.query(query, [user_cx, dinheiro]);

        return {
            success: true,
            message: "Caixa aberto com sucesso"
        };
    }

    if (ultimoOperador != user_cx) {
        return {
            success: false,
            error: "Caixa já está aberto por outro usuário"
        };
    } else {
        const query = "INSERT INTO cx (user_cx, credito, dinheiro, pix, debito, date, time, bit) VALUES (?, 0, ?, 0, 0, curdate(), curtime(), 1)";
        const [result] = await pool.query(query, [user_cx, dinheiro]);

        return {
            success: true,
            message: "Caixa aberto com sucesso"
        };
    }
}

async function forceOpenCx(user_cx: number, dinheiro: number) {
    const [queryUltimoCaixa] = await pool.query<RowDataPacket[]>("SELECT dinheiro, credito, debito, pix, user_cx FROM cx WHERE date < CURDATE() ORDER BY date DESC LIMIT 1 AND bit = 1");
    const ultimoOperador = queryUltimoCaixa[0].user_cx;
    const ultimoSaldoDinheiro = queryUltimoCaixa[0].dinheiro;
    const ultimoSaldoCredito = queryUltimoCaixa[0].credito;
    const ultimoSaldoDebito = queryUltimoCaixa[0].debito;
    const ultimoSaldoPix = queryUltimoCaixa[0].pix;

    const query = "INSERT INTO cx (user_cx, credito, dinheiro, pix, debito, date, time, bit) VALUES (?, ?, ?, ?, ?, curdate(), curtime(), 0)";
    const [result] = await pool.query(query, [ultimoOperador, ultimoSaldoCredito, ultimoSaldoDinheiro, ultimoSaldoPix, ultimoSaldoDebito]);

    const newcx = "INSERT INTO cx (user_cx, credito, dinheiro, pix, debito, date, time, bit) VALUES (?, 0, ?, 0, 0, curdate(), curtime(), 1)";
    const [resultNewCx] = await pool.query(newcx, [user_cx, dinheiro]);

    return {
        success: true,
        message: "Caixa aberto com sucesso"
    }
}

async function closeCx(user_cx: number, credito: number, debito: number, pix: number, dinheiro: number) {
    const query = "INSERT INTO cx (user_cx, credito, debito, pix, dinheiro, date, time, bit) VALUES (?,?,?,?,?,curdate(),curtime(),0);"
    const [result] = await pool.query(query, [user_cx, credito, debito, pix, dinheiro])

    return {
        success: true,
        message: "Caixa fechado com sucesso"
    }
}

 async function withdrawing(user_cx:number, sang:number, sd_old: number) {
    const query = "INSERT INTO withdrawing (user_cx, sang, sd_old, sd_new, date, time) VALUES (?,?,?,?,curdate(), curtime())"
    const sd_new = sd_old - sang

    if (sang > sd_old) {
        return {
            success: false,
            error: "Saldo insuficiente"
        }
    }

    const [ result ] = await pool.query(query, [user_cx, sang, sd_old, sd_new]);

    return {
        success: true,
        message: "Sangria realizada com sucesso"
    }
} 

export default {
    getCx,
    openCx,
    forceOpenCx,
    closeCx,
    withdrawing
}
