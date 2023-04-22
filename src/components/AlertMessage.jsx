import styled from "styled-components";

export default function AlertMessage(props) {
    const { alertMessage, alertOkClick } = props;
    return (
        <Message>
            <h2>Erro</h2>
            <p>{alertMessage}</p>
            <button onClick={alertOkClick}>OK</button>
        </Message>
    )
}

const Message = styled.div`
  position: absolute;
  height: 150px;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f8d7da;
  border: 3px solid #f5c6cb;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 20px;
  h2 {
    font-size: 24px;
    font-weight: bold;
    margin: 0 0 10px;
    color: #721c24;
  }
  p {
    font-size: 18px;
    margin: 0 0 20px;
    color: #721c24;
  }
  button {
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 4px;
    border: none;
    background-color: #dc3545;
    color: #fff;
    cursor: pointer;
    :hover {
      background-color: #c82333;
    }
  }
`;