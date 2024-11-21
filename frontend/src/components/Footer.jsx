import { Container, Row } from "react-bootstrap"
import "./Footer.css"

function Footer() {
    return (
        <Container fluid className="footer-container">
            <div className="footer-content">
                <p style={{ paddingTop: "10px" }}>
                    © 2024 DuitTrack. All rights reserved. Image by <a href="https://www.freepik.com/free-photo/closeup-shot-malaysian-riggit-bills_27738018.htm" target="_blank" rel="noopener noreferrer">Freepik</a>
                </p>
            </div>
        </Container>
    )
};

export default Footer;