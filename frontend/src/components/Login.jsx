import { useState } from 'react';
import { Container } from 'react-bootstrap';
import backgroundImage from "../assets/bgImg.jpg";
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password
            });
            localStorage.setItem('token', response.data.token);
            alert('Login Successful!');
        } catch (error) {
            alert('Login Failed: ' + error.response.data);
        }
    };

    return (
        <Container fluid className="login-container">
            <form className="login-form" onSubmit={handleLogin}>

                <h2 className="mb-5 text-center" style={{fontSize:"40px"}}>User Login</h2>
                <input type="text" className="form-control mb-3" placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)} />
                <input type="password" className="form-control mb-3" placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)} />
                <button className="btn btn-success w-100 mt-3" type="submit">Log In</button>
                <p className="text-center mt-3">
                    Don't have an account yet? <a href="/register">Register here</a>
                </p>

            </form>
        </Container>
    );
};

export default Login;
