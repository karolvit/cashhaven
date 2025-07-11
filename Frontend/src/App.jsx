import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { ThemeProvider } from "styled-components";
import Login from "./paginas/Login";
import { ToastContainer } from "react-toastify";
import Home from "./paginas/Home";
import "react-toastify/dist/ReactToastify.css";
import theme from "../src/theme/Theme";
import PDV from "./paginas/PDV";
import { CadastroCash } from "./paginas/CadastroCash";
import MesaCliente from "./paginas/MesaCliente";
import GerarPDF from "./paginas/pdf";
import ListarRelatorios from "./paginas/ListarRelatorios";
import CadastroCliente from "./paginas/CadastroCliente";
import Usuarios from "./paginas/RegistroUsuario";
import QRCodeNotification from "./componentes/QRCodeDisplay";
function App() {
  const { auth, loading } = useAuth();

  console.log(loading);

  if (loading) {
    return <p>Carregando...</p>;
  }
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <QRCodeNotification />
        <Routes>
          <Route path="/home" element={auth ? <Home /> : <Navigate to="/" />} />
          <Route
            path="/"
            element={!auth ? <Login /> : <Navigate to="/home" />}
          />
          <Route
            path="/"
            element={!auth ? <Login /> : <Navigate to="/pdv" />}
          />
          <Route path="/pdv" element={auth ? <PDV /> : <Navigate to="/" />} />
          <Route
            path="/mesa_clientes"
            element={auth ? <MesaCliente /> : <Navigate to="/" />}
          />
          <Route
            path="/cash"
            element={auth ? <CadastroCash /> : <Navigate to="/" />}
          />
          <Route
            path="/pdf"
            element={auth ? <GerarPDF /> : <Navigate to="/" />}
          />
          <Route
            path="/listar_relatorios"
            element={auth ? <ListarRelatorios /> : <Navigate to="/" />}
          />
          <Route
            path="/cadastro_cliente"
            element={auth ? <CadastroCliente /> : <Navigate to="/" />}
          />
          <Route
            path="/registro"
            element={auth ? <Usuarios /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
