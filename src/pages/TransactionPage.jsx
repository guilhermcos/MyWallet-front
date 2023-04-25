import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

export default function TransactionsPage(props) {
  const navigate = useNavigate();
  const { tipo } = useParams();
  const [inputData, setInputData] = useState({
    description: "",
    value: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    if (!token || !name) {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      navigate("/");
    }
    const validos = ["entrada", "saida"];
    if (!validos.includes(tipo)) return navigate("/home");
  }, []);

  function newTransaction(e) {
    e.preventDefault();
    let type;
    if (tipo === "entrada") {
      type = "income";
    } else if (tipo === "saida") {
      type = "expense";
    }
    const token = localStorage.getItem("token");
    let body = { ...inputData, type };
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_LINK_API}/transactions/new-transaction`,
        body,
        config
      )
      .then((res) => {
        navigate("/home");
      })
      .catch((err) => {
        navigate("/home");
      });
  }

  function handleChange(e) {
    let { name, value } = e.target;
    if (name === "description") {
      setInputData((inputData) => ({ ...inputData, description: value }));
    }
    if (name === "value") {
      value = value.replace(",", ".");
      value = parseFloat(value);
      setInputData((inputData) => ({ ...inputData, value: value }));
    }
  }

  return (
    <TransactionsContainer>
      <h1>Nova {tipo === "entrada" ? "entrada" : "saída"}</h1>
      <form onSubmit={newTransaction}>
        <input
          onChange={handleChange}
          name="value"
          placeholder="Valor"
          type="number"
          step="any"
          required
        />
        <input
          onChange={handleChange}
          name="description"
          placeholder="Descrição"
          type="text"
          required
        />
        <button type="submit">
          Salvar {tipo === "entrada" ? "entrada" : "saída"}
        </button>
      </form>
    </TransactionsContainer>
  );
}

const TransactionsContainer = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    margin-top: 35px;
    align-self: flex-start;
    margin-bottom: 40px;
  }
`;
