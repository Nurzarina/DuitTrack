import { useState } from "react";
import { Container } from 'react-bootstrap';
import axios from "axios";
import backgroundImage from "../assets/bgImg.jpg";
import './Register.css'

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        password,
      });
      alert("Registration Successful!");
      window.location.href = "/login";
    } catch (error) {
      alert("Registration Failed: " + error.response?.data || "Server error");
    }
  };

  return (
    <Container fluid className="register-container">
      <form
        className="register-form">
        <h2 className="text-center mb-4" style={{fontSize:"40px"}}>Register</h2>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100 mt-4">
          Register
        </button>
        <p className="text-center mt-3">
          Already have an account? <a href="/login">Log in here</a>
        </p>
      </form>
    </Container>
  );
};

export default Register;
