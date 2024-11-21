import "./Expenses.css";
import { Container } from "react-bootstrap";

function Expenses() {
  return (
      <div className="expenses-bg">
        <div id="expenses-title">
          <h2>
            <b>Expenses</b></h2>
        </div>
        <Container id="expenses-container">
          <div className="expenses-wrapper">
  
          </div>
        </Container>
      </div>
  );
};

export default Expenses