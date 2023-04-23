import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState } from "react";
import { ProgressBar } from "react-loader-spinner";
import AlertMessage from "../components/AlertMessage";

export default function SignUpPage() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

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

  function alertOkClick() {
    setShowAlert(false);
    setIsDisabled(false);
  }

  function registerUser(e) {
    e.preventDefault();
    const { name, email, password, confirmPassword } = inputData;
    if (password !== confirmPassword) {
      setAlertMessage("A senha e a confirmação de senha devem ser iguais!");
      setIsDisabled(true);
      setShowAlert(true);
      return
    }
    setIsLoading(true);

    const body = { ...inputData };
    delete body.confirmPassword;

    axios
      .post(`${process.env.REACT_APP_LINK_API}/auth/signup`, body)
      .then((res) => {
        setIsLoading(false);
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.message === "Network Error") {
          setAlertMessage("Erro de conexão com o servidor");
        } else if (err.response.status === 409) {
          setAlertMessage("E-mail já cadastrado");
        } else {
          setAlertMessage(err.response.data);
        }
        setIsDisabled(true);
        setShowAlert(true);
        return
      });
  }

  return (
    <SingUpContainer>
      {showAlert &&
        <AlertMessage alertOkClick={alertOkClick} alertMessage={alertMessage} />
      }
      <form onSubmit={registerUser}>
        <MyWalletLogo />
        <input
          onChange={(e) => handleChange(e)}
          placeholder="Nome"
          name="name"
          minLength={3}
          type="text"
          disabled={isDisabled}
          required
        />
        <input
          onChange={(e) => handleChange(e)}
          placeholder="E-mail"
          name="email"
          type="email"
          disabled={isDisabled}
          required
        />
        <input
          onChange={(e) => handleChange(e)}
          placeholder="Senha"
          name="password"
          type="password"
          autoComplete="new-password"
          disabled={isDisabled}
          required
        />
        <input
          onChange={(e) => handleChange(e)}
          placeholder="Confirme a senha"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          disabled={isDisabled}
          required
        />
        <button type="submit" disabled={isDisabled}>{isLoading ? <ProgressBar height="80" borderColor="#ffffff" /> : "Cadastrar"}</button>
      </form>

      <Link to={"/"}>Já tem uma conta? Entre agora!</Link>
    </SingUpContainer>
  );
}

const SingUpContainer = styled.section`
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
      }
      `;
