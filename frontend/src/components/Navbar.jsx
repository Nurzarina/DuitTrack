import { FaCoins, FaChartBar, FaUser } from 'react-icons/fa';
import { Nav, Navbar } from 'react-bootstrap';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navibar = () => {
    return (
        <Navbar className='sidebar'>
            <span className='logo'>
                DuitTrack
            </span>

            <Nav className='nav'>
                <Nav.Link as={Link} to="/expenses" className='nav-item'>
                    <FaCoins /> Expenses
                </Nav.Link>
                <Nav.Link as={Link} to="/statistic" className='nav-item'>
                    <FaChartBar /> Statistic
                </Nav.Link>
                <Nav.Link as={Link} to="/usersetting" className='nav-item'>
                    <FaUser /> User Settings
                </Nav.Link>
            </Nav>
        </Navbar>
    )
};

export default Navibar;