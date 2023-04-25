import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { BiTrash } from "react-icons/bi";

export default function TransactionsContainer(props) {
  const { transactions, setShowConfirm, setDeleteId, setIsDisabled } = props;
  let saldo = 0;
  const navigate = useNavigate();

  if (transactions.length === 0) {
    return (
      <StyledNoTransactions>
        <p>
          Não há registros de
          <br /> entrada ou saída
        </p>
      </StyledNoTransactions>
    );
  }

  return (
    <StyledTransactionsContainer>
      <div>
        <ul>
          {transactions.map((transaction) => {
            if (transaction.type === "expense") {
              saldo -= transaction.value;
            } else {
              saldo += transaction.value;
            }
            return (
              <ListItemContainer key={transaction._id}>
                <div>
                  <span>{transaction.date.replace("-", "/")}</span>

                  <strong
                    onClick={() => {
                      navigate(
                        `/editar-transacao/${
                          transaction.type
                        }/${transaction.value.toFixed(2).replace(".", ",")}/${
                          transaction.description
                        }/${transaction._id}`
                      );
                    }}
                  >
                    {transaction.description}
                  </strong>
                </div>
                <Value color={transaction.type}>
                  {transaction.value.toFixed(2).replace(".", ",")}
                  <BiTrash
                    onClick={() => {
                      setDeleteId(transaction._id);
                      setIsDisabled(true);
                      setShowConfirm(true);
                    }}
                    color="red"
                  />
                </Value>
              </ListItemContainer>
            );
          })}
        </ul>
      </div>

      <div className="saldo">
        <strong>Saldo</strong>
        <Value color={saldo < 0 ? "expense" : "income"}>
          {saldo.toFixed(2).replace(".", ",")}
        </Value>
      </div>
    </StyledTransactionsContainer>
  );
}

const StyledNoTransactions = styled.article`
  flex-grow: 1;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    color: #868686;
    font-family: Raleway;
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: center;
  }
`;

const StyledTransactionsContainer = styled.article`
  > div {
    overflow-y: scroll;
    padding: 16px;
    padding-right: 0px;
    padding-left: 6px;
  }
  position: relative;
  overflow-y: hidden;
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .saldo {
    background-color: #ffffff;
    overflow-y: hidden;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
    a {
      font-weight: 700;
      text-transform: uppercase;
      color: black;
    }
  }
`;

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "income" ? "#03AC00" : "#C70000")};
  display: flex;
  gap: 3px;
`;
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    font-family: monospace;
    font-size: 15px;
    color: #c6c6c6;
    margin-right: 10px;
    text-rendering: optimizeLegibility;
  }
`;
