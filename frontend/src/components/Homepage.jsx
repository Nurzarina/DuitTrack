import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap';
import backgroundImage from "../assets/bgImg.jpg";
import './Homepage.css';

const Homepage = () => {
  return (
    <Container fluid className="homepage-container">
      <div className="homepage-content">
        <h1 className="text-center mb-5" style={{ fontSize: "3rem" }}>Welcome to <b style={{ color:"#2ed573", fontSize:"4rem" }}>DuitTrack</b></h1>
        <p className="text-center mb-5" style={{ fontSize:"1.5em" }}>
          Simplify your spending, track your finances, and take control with DuitTrack.
        </p>
        <br></br>
        <h2 className="text-center mb-4" style={{ fontSize: "24px" }}> What would you like to do?</h2>
        <div className="d-flex flex-column gap-3">
          <Link to="/register" className="btn btn-success btn-lg">
            Register
          </Link>
          <Link to="/login" className="btn btn-primary btn-lg">
            Log In
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Homepage;
