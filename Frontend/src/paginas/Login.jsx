import logo from "../assets/img/logo_sem_fundo.png";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../slices/authSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import styled, { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Josefin Sans', serif;
    margin: 0;
    padding: 0;
    background-color: #712976;
    @media screen and (max-width: 900px) {
    background: #fff;
    
  }
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  @media screen and (max-width: 900px) {
    height: 1px;
    width: 50vw;
    margin: auto;
  }
`;

const LoginContainer = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  max-width: 1200px;
  align-items: center;
`;

const LoginImage = styled.img`
  flex: 1;
  width: 500px;
  object-fit: fill;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const LoginForm = styled.div`
  flex: 1;
  padding: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 900px) {
    padding: 40px;
    position: relative;
  }
`;
const CelularImagem = styled.img`
  display: none;
  width: 50%;
  height: 40%;
  margin-top: 20px;
  border-radius: 50%;

  @media screen and (max-width: 900px) {
    display: block;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: 40px;
  color: #712976;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  font-weight: bold;
  color: #712976;
  width: 100%;
  height: 2.3rem;
  margin: 5px 0;
  font-size: 18px;
`;

const Input = styled.input`
  padding-left: 10px;
  border: none;

  background-color: #cbc6bf !important;
  border-radius: 10px;
  font-weight: bold;
  width: 100%;
  height: 2.3rem;
  margin: 5px 0;

  &::placeholder {
    color: #5f387a;
    font-weight: normal;
  }
`;

const Button = styled.input`
  width: 100%;
  margin-top: 40px;
  padding: 12px 90px;
  background-color: #712976;
  text-decoration: none;
  border: 1px solid #5f387a;
  transition: 0.5s;
  color: #f1f1f1;
  cursor: pointer;

  &:hover {
    background-color: #8f3562;
    border-radius: 50px;
  }
`;

const Login = () => {
  //states login
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth || {});

  //Criação do botão de login
  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      usuario,
      senha,
    };
    dispatch(login(user));
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      <GlobalStyle />
      <Container>
        <LoginContainer>
          <LoginImage src={logo} alt="Imagem de fundo" />
          <LoginForm>
            <Title>LOGIN</Title>
            <Form onSubmit={handleSubmit}>
              <Label htmlFor="username">Usuário:</Label>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="Digite seu usuario"
                onChange={(e) => setUsuario(e.target.value)}
                value={usuario || ""}
              />
              <Label htmlFor="password">Senha:</Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Digite sua senha"
                onChange={(e) => setSenha(e.target.value)}
                value={senha || ""}
              />
              {!loading && <Button type="submit" value="Entrar" />}
              {loading && <Button type="submit" value="Aguarde..." disabled />}

              <CelularImagem src={logo} alt="Imagem para mobile" />
            </Form>
          </LoginForm>
        </LoginContainer>
      </Container>
    </>
  );
};

export default Login;
