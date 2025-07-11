import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Login from "./paginas/Login.jsx";
import RegistroUsuario from "./paginas/RegistroUsuario.jsx";
import PesquisaCash from "./paginas/PesquisaCash.jsx";
import Home from "./paginas/Home.jsx";
import { WebSocketProvider } from "./context/WebSocketContext.jsx";
import PDV from "./paginas/PDV.jsx";
import { CadastroCash } from "./paginas/CadastroCash.jsx";
import MesaCliente from "./paginas/MesaCliente.jsx";
import GerarPDF from "./paginas/pdf.jsx";
import ListarRelatorios from "./paginas/ListarRelatorios.jsx";
import CadastroCliente from "./paginas/CadastroCliente.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "registro",
        element: <RegistroUsuario />,
      },
      {
        path: "cadastro_cliente",
        element: <CadastroCliente />,
      },
      {
        path: "cash",
        element: <PesquisaCash />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "pdv",
        element: <PDV />,
      },
      {
        path: "cash",
        element: <CadastroCash />,
      },
      {
        path: "mesa_clientes",
        element: <MesaCliente />,
      },
      {
        path: "pdf",
        element: <GerarPDF />,
      },
      {
        path: "listar_relatorios",
        element: <ListarRelatorios />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <WebSocketProvider>
        <RouterProvider router={router} />
      </WebSocketProvider>
    </Provider>
  </React.StrictMode>
);
