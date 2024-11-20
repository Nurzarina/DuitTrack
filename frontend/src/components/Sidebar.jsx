import { FaCoins, FaChartBar, FaUser } from 'react-icons/fa';
import "./Sidebar.css"

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className='logo'>DuitTrack</div>

            <nav className='nav'>
                <a href='#expenses' className='nav-item'>
                    <FaCoins /> Expenses
                </a>
                <a href='#statistics' className='nav-item'>
                    <FaChartBar /> Statistic
                </a>
                <a href='#settings' className='nav-item'>
                    <FaUser /> User Settings
                </a>
            </nav>
        </div>
    )
};

export default Sidebar;