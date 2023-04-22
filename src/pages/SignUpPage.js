import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState } from "react";

export default function SignUpPage() {
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "name") {
      setInputData((inputData) => ({ ...inputData, name: value }));
    }
    if (name === "email") {
      setInputData((inputData) => ({ ...inputData, email: value }));
    }
    if (name === "password") {
      setInputData((inputData) => ({ ...inputData, password: value }));
    }
    if (name === "confirmPassword") {
      setInputData((inputData) => ({ ...inputData, confirmPassword: value }));
    }
  }

  function registerUser(e) {
    e.preventDefault();
    const { name, email, password, confirmPassword } = inputData;
    if (password !== confirmPassword) {
      return alert("a Senha e a Confirmação de senha precisam ser iguais!");
    }

    const body = { ...inputData }; 
    delete body.confirmPassword;

    axios
      .post(`http://localhost:5000/auth/signup`, body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  return (
    <SingUpContainer>
      <form onSubmit={registerUser}>
        <MyWalletLogo />
        <input
          onChange={(e) => handleChange(e)}
          placeholder="Nome"
          name="name"
          minLength={3}
          type="text"
          required
        />
        <input
          onChange={(e) => handleChange(e)}
          placeholder="E-mail"
          name="email"
          type="email"
          required
        />
        <input
          onChange={(e) => handleChange(e)}
          placeholder="Senha"
          name="password"
          type="password"
          autoComplete="new-password"
          required
        />
        <input
          onChange={(e) => handleChange(e)}
          placeholder="Confirme a senha"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
        />
        <button type="submit">Cadastrar</button>
      </form>

      <Link>Já tem uma conta? Entre agora!</Link>
    </SingUpContainer>
  );
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
