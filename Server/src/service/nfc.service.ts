import axios from "axios";
import { RowDataPacket } from "mysql2";
import pool from "../database/connection";
import * as dotenv from "dotenv";

dotenv.config();

interface Pagamento {
  pedido: number;
  tipo: string;
  valor_recebido: number;
  valor_pedido: number;
  cb?: number;
  price_cb?: number;
  bit: number;
}

interface Client {
  pedido: number;
  uid: number;
  cashback: number;
  cpf: string;
}

interface produtosCliente {
  produto_nome: string;
  valor_unit: number;
  unino: number;
  prodno: number;
}

export async function trueUid(pagamento: Pagamento, client: Client, produtosCliente: produtosCliente[]) {
  try {
    const [params] = await pool.query<RowDataPacket[]>("SELECT t1 as ck, t2 as csk, t3 as at, t4 as ats FROM company");
    const [ambiente_emissao] = await pool.query<RowDataPacket[]>("SELECT value as param FROM sys WHERE id = 9");
    const ambienteEmissao = parseInt(ambiente_emissao[0].param, 10);

    const t1 = params[0].ck;
    const t2 = params[0].csk;
    const t3 = params[0].at;
    const t4 = params[0].ats;

    const produtosPayload: any[] = [];

    for (const item of produtosCliente) {
      const [nome_produto] = await pool.query<RowDataPacket[]>(
        "SELECT product FROM stock WHERE id = ?",
        [item.prodno]
      );
      const [imposto] = await pool.query<RowDataPacket[]>(
        "SELECT ncm, cest FROM stock WHERE id = ?",
        [item.prodno]
      );

      const ncm = imposto[0]?.ncm || "";
      const cest = imposto[0]?.cest || "";
      const total_produto = item.unino * item.valor_unit;

      produtosPayload.push({
        nome: nome_produto[0]?.product || "Produto Desconhecido",
        codigo: item.prodno,
        ncm: ncm,
        cest: cest,
        quantidade: item.unino,
        unidade: "UN",
        peso: item.unino,
        origem: 0,
        subtotal: item.valor_unit,
        total: total_produto.toFixed(2),
        classe_imposto: "REF353907394",
      });
    }

    console.log(produtosPayload);

    const nfePayload = {
      ID: pagamento.pedido,
      operacao: 1,
      natureza_operacao: "Venda de mercadoria",
      modelo: 2,
      finalidade: 1,
      ambiente: ambienteEmissao,
      cliente: {
        cpf: client.cpf,
      },
      produtos: produtosPayload,
      pedido: {
        pagamento: 0,
        presenca: 1,
        modalidade_frete: 9,
      },
    };

    const headers = {
      "X-Consumer-Key": t1,
      "X-Consumer-Secret": t2,
      "X-Access-Token": t3,
      "X-Access-Token-Secret": t4,
    };

    const url = process.env.routeEmitir || '';

    const response = await axios.post(url, nfePayload, { headers });

    const queryNFC = "INSERT INTO panel_nfc (pedido, uuid, status, motivo, nfe, serie, modelo, chave) VALUES (?,?,?,?,?,?,?,?)";
    await pool.query(queryNFC, [
      pagamento.pedido,
      response.data.uuid,
      response.data.status,
      response.data.motivo,
      response.data.nfe,
      response.data.serie,
      response.data.modelo,
      response.data.chave
    ]);
  } catch (error: any) {
    console.error("Erro ao enviar nota fiscal:", error.message);
    console.error(error);
    throw new Error("Erro ao emitir NFe");
  }
}



export async function falseUid(pagamento: Pagamento, client: Client, produtosCliente: produtosCliente[]) {
  try {
    const [params] = await pool.query<RowDataPacket[]>("SELECT t1 as ck, t2 as csk, t3 as at, t4 as ats FROM company");
    const [ambiente_emissao] = await pool.query<RowDataPacket[]>("SELECT value as param FROM sys WHERE id = 9");
    const ambienteEmissao = parseInt(ambiente_emissao[0].param, 10);

    const t1 = params[0].ck;
    const t2 = params[0].csk;
    const t3 = params[0].at;
    const t4 = params[0].ats;

    const produtosPayload: any[] = [];

    for (const item of produtosCliente) {
      const [nome_produto] = await pool.query<RowDataPacket[]>(
        "SELECT product FROM stock WHERE id = ?",
        [item.prodno]
      );
      const [imposto] = await pool.query<RowDataPacket[]>(  
        "SELECT ncm, cest FROM stock WHERE id = ?",
        [item.prodno]
      );

      const ncm = imposto[0]?.ncm || "";
      const cest = imposto[0]?.cest || "";
      const total_produto = item.unino * item.valor_unit;

      produtosPayload.push({
        nome: nome_produto[0]?.product || "Produto Desconhecido",
        codigo: item.prodno,
        ncm: ncm,
        cest: cest,
        quantidade: item.unino,
        unidade: "UN",
        peso: item.unino,  // Ajuste o peso conforme sua necessidade
        origem: 0,
        subtotal: item.valor_unit,
        total: total_produto.toFixed(2), // Garantir formato correto
        classe_imposto: "REF353907394",
      });
    }

    console.log(produtosPayload);

    // Estrutura final com um único array de produtos
    const nfePayload = {
      ID: pagamento.pedido,
      operacao: 1,
      natureza_operacao: "Venda de mercadoria",
      modelo: 2,
      finalidade: 1,
      ambiente: ambienteEmissao,
      cliente: {
        cpf: client.cpf,
      },
      produtos: produtosPayload, // Um único array com todos os produtos
      pedido: {
        pagamento: 0,
        presenca: 1,
        modalidade_frete: 9,
      },
    };

    // Cabeçalhos para autenticação
    const headers = {
      "X-Consumer-Key": t1,
      "X-Consumer-Secret": t2,
      "X-Access-Token": t3,
      "X-Access-Token-Secret": t4,
    };

    // URL para emitir a NFe
    const url = process.env.routeEmitir || '';

    // Enviar a requisição para emitir a nota fiscal
    const response = await axios.post(url, nfePayload, { headers });

    // Inserir dados no banco
    const queryNFC = "INSERT INTO panel_nfc (pedido, uuid, status, motivo, nfe, serie, modelo, chave) VALUES (?,?,?,?,?,?,?,?)";
    await pool.query(queryNFC, [
      pagamento.pedido,
      response.data.uuid,
      response.data.status,
      response.data.motivo,
      response.data.nfe,
      response.data.serie,
      response.data.modelo,
      response.data.chave
    ]);
  } catch (error: any) {
    console.error("Erro ao enviar nota fiscal:", error.message);
    console.error(error);
    throw new Error("Erro ao emitir NFe");
  }
}

async function getDanfe(chave_nfc: string) {
  try {
    const danfe = process.env.serachDanfe;
    const response = await axios.get(`${danfe}${chave_nfc}`);
    console.log(`${danfe}${chave_nfc}`);

    return {
      success: true,
      message: response.data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error,
    };
  }
}

async function allNFC() {
  const query = "SELECT * FROM panel_nfc";
  const [result] = await pool.query(query);

  return {
    success: true,
    message: result,
  };
}

export default {
  trueUid,
  falseUid,
  getDanfe,
  allNFC,
};
