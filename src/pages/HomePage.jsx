import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlass } from "react-loader-spinner";
import TransactionsContainer from "../components/Home/TransactionsContainer";
import AlertMessage from "../components/AlertMessage";

export default function HomePage() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    if (!token || !name) {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      navigate("/");
      return;
    }
    setUserName(name[0].toUpperCase() + name.slice(1).toLowerCase());

    axios
      .get(`${process.env.REACT_APP_LINK_API}/transactions/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTransactions(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setAlertMessage(err.message);
        setShowAlert(true);
        setIsDisabled(true);
      });
  }, []);

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/");
  }

  function alertOkClick() {
    setShowAlert(false);
    setIsDisabled(false);
    logOut();
  }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {userName}</h1>
        <BiExit onClick={logOut} />
      </Header>
      {isLoading ? (
        <LoadingTransactionContainer>
          <MagnifyingGlass width={110} height={110} />
        </LoadingTransactionContainer>
      ) : (
        <TransactionsContainer transactions={transactions} />
      )}
      {showAlert && (
        <AlertMessage alertOkClick={alertOkClick} alertMessage={alertMessage} />
      )}

      <ButtonsContainer>
        <button
          onClick={() => {
            navigate("/nova-transacao/entrada");
          }}
          disabled={isDisabled}
        >
          <AiOutlinePlusCircle />
          <p>
            Nova <br /> entrada
          </p>
        </button>
        <button
          onClick={() => {
            navigate("/nova-transacao/saida");
          }}
          disabled={isDisabled}
        >
          <AiOutlineMinusCircle />
          <p>
            Nova <br />
            saída
          </p>
        </button>
      </ButtonsContainer>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-bottom: 20px;
`;
const Header = styled.header`
  margin-top: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`;

const LoadingTransactionContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;

  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`;
