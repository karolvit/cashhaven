import { useState } from "react";
import html2pdf from "html2pdf.js";
import apiAcai from "../axios/config";

const GerarPDF = () => {
  const [loading, setLoading] = useState(false);

  const handleGeneratePDF = async () => {
    setLoading(true);

    try {
      const response = await apiAcai.get(
        "/panel/danfe?chave=29250122260208000182650010000000071700276273",
        {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "text",
        }
      );

      const data = JSON.parse(response.data);

      if (!data.success || !data.message) {
        throw new Error("A resposta da API não contém a mensagem esperada.");
      }

      const htmlContent = data.message;
      const opt = {
        margin: 1,
        filename: "arquivo-gerado.pdf",
        html2canvas: {
          scale: 10,
          useCORS: true,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      const element = document.createElement("div");
      element.innerHTML = htmlContent;
      html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("Erro ao gerar o PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleGeneratePDF} disabled={loading}>
        {loading ? "Gerando PDF..." : "Gerar PDF"}
      </button>
    </div>
  );
};

export default GerarPDF;
