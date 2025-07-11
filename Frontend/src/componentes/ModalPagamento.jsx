import React from "react";
import Modal from "react-modal";
import SetaFechar from "./SetaFechar";

const ModalPagamento = ({
  isOpen,
  onClose,
  produtos = [],
  mesasFin = [],
  mesa,
  valor_recebido,
  verificarValorRecebidoPagamento,
  adicionaPagamento,
  abrirModalPreco_Recebido,
  valorTotal,
  valorRecebidoPagamento,
  valorTroco,
  botaoEnvio,
  botaoInativdo,
  abrirModalCancelamento,
  modalPreco_Recebido,
  fecharModalPreco_Recebido,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          maxWidth: "80%",
          maxHeight: "100%",
          margin: "auto",
          padding: 0,
          backgroundColor: "#f8f4f4",
        },
      }}
    >
      <div className="modal-mensagem">
        <SetaFechar Click={onClose} />
        <h2>Pagamento</h2>
      </div>
      <div className="flex_pagamento">
        <div>
          <div className="tabela_pagamento">
            <table className="tabela_resumo tabela_pag">
              <thead>
                <tr>
                  <th className="thPDV">Código</th>
                  <th className="thPDV">Desc</th>
                  <th className="thPDV">Qtd</th>
                  <th className="thPDV">Total</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto, index) => (
                  <tr key={produto.id ? produto.id : index}>
                    <td className="tdPDV">{produto.id}</td>
                    <td className="tdPDV">{produto.nome}</td>
                    <td className="tdPDV">{produto.unino}</td>
                    <td className="tdPDV">
                      R$ {produto.precoUnitario * produto.unino}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Modal
            isOpen={modalPreco_Recebido}
            onRequestClose={fecharModalPreco_Recebido}
            style={{
              content: {
                width: "50%",
                height: "120px",
                margin: "auto",
                padding: 0,
              },
            }}
          >
            <div className="modal-mensagem">
              <SetaFechar Click={fecharModalPreco_Recebido} />
              <h2>Valor recebido por cliente</h2>
            </div>
            <div className="kg">
              <label>Valor Recebido </label>
              <input
                type="text"
                value={valor_recebido}
                onChange={verificarValorRecebidoPagamento}
              />
              <input
                type="button"
                value="Lançar Adicionar Valor"
                className="botao-add"
                onClick={adicionaPagamento}
              />
            </div>
          </Modal>

          <div className="input-pagamento">
            <label>Valor Total</label>
            <input type="number" value={valorTotal()} disabled />
            <label>Valor Recebido</label>
            <input type="number" value={valorRecebidoPagamento()} disabled />
            <label>Valor Troco</label>
            <input type="number" value={valorTroco()} disabled />
            <div className="btn-pagamento">
              <button
                className="btn-finalizar"
                onClick={botaoEnvio}
                disabled={!botaoInativdo()}
              >
                Finalizar
              </button>
              <button
                className="btn-cancelar-pagamento"
                onClick={abrirModalCancelamento}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalPagamento;
