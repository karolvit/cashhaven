import pool from "../database/connection";
import { sendSaleMessage } from "../websocket/ws";

async function sale(id: number, venda: number, inicio: string, fim: string) {
    try {
        const queryOldPrice = "SELECT p_venda as old_price FROM stock WHERE id = ?";
        const [resultOldPrice]: any[] = await pool.query(queryOldPrice, [id]);

        if (resultOldPrice.length === 0) {
            return {
                success: false,
                error: ["Código do produto não encontrado"]
            };
        }

        const oldPrice = resultOldPrice[0].old_price;

        const queryInserSale = "INSERT INTO sale (prod, saleprice, oldprice, init, end) VALUES (?,?,?,?,?)";
        const [resultInsertPrice] = await pool.query(queryInserSale, [id, venda, oldPrice, inicio, fim]);

        const SaleMessage = JSON.stringify({
            productId: id,
            salePrice: venda,
            oldPrice: oldPrice,
            startDate: inicio,
            endDate: fim,
        });

        sendSaleMessage(SaleMessage);

        return {
            success: true,
            message: ["Promoção inserida com sucesso"]
        };
    } catch (error) {
        return {
            success: false,
            error: ["Erro ao inserir promoção, entre em contato com administrador do sistema"]
        };
    }
}

export default {
    sale
};
