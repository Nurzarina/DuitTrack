import './WelcomeBox.css'
import { useState } from 'react';
import { Button } from 'react-bootstrap';

function WelcomeBox() {

    const [username, setUsername] = useState("john_doe"); // Simulated logged-in user

    const handleLogout = () => {
        localStorage.removeItem("token"); // Clear the user token (if using JWT)
        window.location.href = "/"; // Redirect to homepage
      };

    return (
        <div className="welcome-box">
            <span className="me-3">Welcome back, <b>{username}</b></span>
            <Button variant="danger" className="logout-button" onClick={handleLogout}>Logout</Button>
        </div>
    )
}

export default WelcomeBox