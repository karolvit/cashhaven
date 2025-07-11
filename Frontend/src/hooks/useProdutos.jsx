import { useState } from "react";

const useProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [quantidadeEstoque, setQuantidadeEstoque] = useState(0);

  const adicionarProduto = (
    produto,
    unino,
    precoUnitario,
    nome,
    kgacai,
    setStateCallbacks
  ) => {
    if (produto && unino && precoUnitario) {
      if (
        (produto !== "1" && unino > parseFloat(quantidadeEstoque)) ||
        (produto === "1" && unino > parseFloat(quantidadeEstoque))
      ) {
        return;
      }
      const novoProduto = {
        id: parseInt(produto),
        nome: nome,
        unino: parseFloat(unino),
        precoUnitario: parseFloat(precoUnitario),
      };
      setProdutos([...produtos, novoProduto]);

      const {
        setNome,
        setProduto,
        setUnino,
        setPrecoUnitario,
        setCodigo_Produto,
        setKgacai,
      } = setStateCallbacks;
      setNome("");
      setProduto("");
      setUnino("");
      setPrecoUnitario("");
      setCodigo_Produto("");
      setKgacai("");
    }
  };

  const removerProduto = (id) => {
    const novaLista = produtos.filter((produto) => produto.id !== id);
    setProdutos(novaLista);
  };

  return {
    produtos,
    adicionarProduto,
    removerProduto,
    setQuantidadeEstoque,
  };
};

export default useProdutos;
