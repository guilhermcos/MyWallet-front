import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProgressBar } from "react-loader-spinner";
import styled from "styled-components";

export default function EditPage(props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  let { id, tipo, description, value } = useParams();
  const [inputData, setInputData] = useState({
    description: description,
    value: value.replace(",", "."),
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    if (!token || !name) {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      navigate("/");
    }
    const validos = ["income", "expense"];
    if (!validos.includes(tipo)) return navigate("/home");
  }, []);

  function editTransaction(e) {
    e.preventDefault();
    setIsLoading(true);
    let type = tipo;
    const token = localStorage.getItem("token");
    let body = { ...inputData, type };
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .put(
        `${process.env.REACT_APP_LINK_API}/transactions/edit-transaction/${id}`,
        body,
        config
      )
      .then((res) => {
        setIsLoading(false);
        navigate("/home");
      })
      .catch((err) => {
        setIsLoading(false);
        navigate("/home");
      });
  }

  function handleChange(e) {
    let { name, value } = e.target;
    if (name === "description") {
      setInputData((inputData) => ({ ...inputData, description: value }));
    }
    if (name === "value") {
      if (value === "") {
        setInputData((inputData) => ({ ...inputData, value: "" }));
        return
      }
      value = value.replace(",", ".");
      value = parseFloat(value);
      setInputData((inputData) => ({ ...inputData, value: value }));
    }
  }

  return (
    <TransactionsContainer>
      <h1>Editar {tipo === "income" ? "entrada" : "saída"}</h1>
      <form onSubmit={editTransaction}>
        <input
          onChange={handleChange}
          name="value"
          placeholder="Valor"
          type="number"
          step="any"
          value={inputData.value}
          required
        />
        <input
          onChange={handleChange}
          name="description"
          value={inputData.description}
          placeholder="Descrição"
          type="text"
          required
        />
        <button type="submit">
          {isLoading ? (
            <ProgressBar height="80" borderColor="#ffffff" />
          ) : (
            `Salvar ${tipo === "income" ? "entrada" : "saída"}`
          )}
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
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
  }
`;
