import './WelcomeBox.css'
import { useState } from 'react';
import { IoExit } from "react-icons/io5";
import { Button } from 'react-bootstrap';

function WelcomeBox() {

    // const [username, setUsername] = useState("");

    let username = localStorage.getItem('username') || "Guest";

    console.log("Username in localStorage:", localStorage.getItem('username'));      // For debugging purpose
    console.log("User_id in localStorage:", localStorage.getItem('user_id'));      // For debugging purpose

    const handleLogout = () => {
        localStorage.removeItem("token"); // Clear the JWT token
        localStorage.removeItem("username"); // Clear the username
        window.location.href = "/"; // Redirect to homepage
      };

    return (
        <div className="welcome-box">
            <span className="mt-1 mx-4">Welcome back, <b>{username}</b></span>
            <Button id="logout-button" onClick={handleLogout}><IoExit /> Logout</Button>
        </div>
    )
}

export default WelcomeBox