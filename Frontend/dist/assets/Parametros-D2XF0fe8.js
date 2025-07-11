import{f as x,d as a,r as t,j as e}from"./index-BPiSh7wB.js";const c=x`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`,u=a.div`
  padding: 2rem;
  font-family: Arial, Helvetica, sans-serif;
  width: 1000px;
`,p=a.div`
  display: flex;
  margin-bottom: 20px;
  
`,i=a.button`
  padding: 10px 90px;
  font-weight: bold;
  color: #73287d;
  background: ${({active:l})=>l?"#f3eef7":"transparent"};
  border: 2px solid #73287d;
  border-bottom: ${({active:l})=>l?"none":"2px solid #73287d"};
  cursor: pointer;
  border-radius: 10px 10px 0 0;
`,n=a.div`
  background: #fff;
  padding: 2rem;
  border: 2px solid #73287d;
  border-radius: 0 0 10px 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  input {
    padding: 0.5rem;
    border: 1px solid #73287d;
    border-radius: 8px;
    font-size: 16px;
    color: #73287d;
  }

  label {
    font-weight: bold;
    color: #73287d;
  }
`,s=a.div`
  display: flex;
  flex-direction: column;
`,j=a.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,b=()=>{const[l,r]=t.useState("empresa"),[d,o]=t.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(c,{}),e.jsxs(u,{children:[e.jsx("h2",{style:{color:"#73287d",marginBottom:"20px"},children:"PARÂMETROS"}),e.jsxs(p,{children:[e.jsx(i,{active:l==="empresa",onClick:()=>r("empresa"),children:"Configuração Empresa"}),e.jsx(i,{active:l==="pdv",onClick:()=>r("pdv"),children:"Configuração PDV"}),e.jsx(i,{active:l==="impressora",onClick:()=>r("impressora"),children:"Configuração Impressora"})]}),l==="empresa"&&e.jsxs(n,{children:[e.jsxs(s,{children:[e.jsx("label",{children:"ID"}),e.jsx("input",{defaultValue:"1",disabled:!0})]}),e.jsxs(s,{children:[e.jsx("label",{children:"Razão Social"}),e.jsx("input",{defaultValue:"AÇAÍ CONXEGO"})]}),e.jsxs(s,{children:[e.jsx("label",{children:"CNPJ"}),e.jsx("input",{defaultValue:"25181960000126"})]}),e.jsxs(s,{children:[e.jsx("label",{children:"IE"}),e.jsx("input",{defaultValue:"202823201"})]}),e.jsxs(s,{children:[e.jsx("label",{children:"Bairro"}),e.jsx("input",{defaultValue:"BOCA DO RIO"})]}),e.jsxs(s,{children:[e.jsx("label",{children:"Endereço"}),e.jsx("input",{defaultValue:"RUA ORLANDO MOSCOSO 166"})]}),e.jsxs(s,{children:[e.jsx("label",{children:"Cidade"}),e.jsx("input",{defaultValue:"SALVADOR"})]}),e.jsxs(s,{children:[e.jsx("label",{children:"Estado"}),e.jsx("input",{defaultValue:"BA"})]})]}),l==="pdv"&&e.jsxs(n,{children:[e.jsxs(s,{children:[e.jsx("label",{children:"Saldo mínimo para resgate"}),e.jsx("input",{defaultValue:"3.00"})]}),e.jsxs(s,{children:[e.jsx("label",{children:"Percentual cashback"}),e.jsx("input",{defaultValue:"3.00"})]}),e.jsxs(s,{children:[e.jsx("label",{children:"Desativar/Ativar venda manual"}),e.jsxs(j,{children:[e.jsx("input",{type:"checkbox",checked:d,onChange:()=>o(!d)}),e.jsx("span",{children:d?"Ativo":"Inativo"})]})]})]}),l==="impressora"&&e.jsxs(n,{children:[e.jsxs(s,{children:[e.jsx("label",{children:"ID"}),e.jsx("input",{defaultValue:"1",disabled:!0})]}),e.jsxs(s,{children:[e.jsx("label",{children:"IP"}),e.jsx("input",{defaultValue:"192.168.10.16",disabled:!0})]}),e.jsxs(s,{children:[e.jsx("label",{children:"Modelo"}),e.jsx("input",{defaultValue:"ELGIN I9 (IP)",disabled:!0})]})]})]})]})};export{b as default};
