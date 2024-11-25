import { Container, Row } from "react-bootstrap"
import "./Footer.css"

function Footer() {
    return (
        <Container fluid className="footer-container">
            <div className="footer-content">
                <p style={{ paddingTop: "10px" }}>
                    © 2024 DuitTrack. All rights reserved for the website's code and design. The background image is by <a href="https://www.freepik.com/free-photo/closeup-shot-malaysian-riggit-bills_27738018.htm" target="_blank" rel="noopener noreferrer">Freepik</a> and is used with attribution under their licensing terms.
                </p>
            </div>
        </Container>
    )
};

export default Footer;