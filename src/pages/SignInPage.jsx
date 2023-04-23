import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import AlertMessage from "../components/AlertMessage";
import { ProgressBar } from "react-loader-spinner";
import axios from "axios";

export default function SignInPage() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "email") {
      setInputData((inputData) => ({ ...inputData, email: value }));
    }
    if (name === "password") {
      setInputData((inputData) => ({ ...inputData, password: value }));
    }
  }

  function loginUser(e) {
    e.preventDefault();
    setIsLoading(true);

    const body = { ...inputData };

    axios
      .post(`${process.env.REACT_APP_LINK_API}/auth/signin`, body)
      .then((res) => {
        setIsLoading(false);
        console.log(res.data);
        navigate("/home")
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.message === "Network Error") {
          setAlertMessage("Erro de conexão com o servidor");
        } else if (err.response.status === 401) {
          setAlertMessage("E-mail ou Senha inválidos");
        } else if (err.response.status === 404) {
          setAlertMessage("E-mail não cadastrado");
        } else {
          setAlertMessage(err.response.data);
        }
        setIsDisabled(true);
        setShowAlert(true);
        return
      });
  }

  function alertOkClick() {
    setShowAlert(false);
    setIsDisabled(false);
  }

  return (
    <SingInContainer>
      {showAlert &&
        <AlertMessage alertOkClick={alertOkClick} alertMessage={alertMessage} />
      }
      <form onSubmit={loginUser}>
        <MyWalletLogo />
        <input
          onChange={handleChange}
          placeholder="E-mail"
          type="email"
          name="email"
          disabled={isDisabled}
          required
        />
        <input
          onChange={handleChange}
          placeholder="Senha"
          type="password"
          minLength={3}
          name="password"
          autoComplete="new-password"
          disabled={isDisabled}
          required
        />
        <button type="submit" disabled={isDisabled} >{isLoading ? <ProgressBar height="80" borderColor="#ffffff" /> : "Entrar"}</button>
      </form>

      <Link to={"/cadastro"}>Primeira vez? Cadastre-se!</Link>
    </SingInContainer>
  );
}

const SingInContainer = styled.div`
  height: 100vh;
  width: 100%;
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
