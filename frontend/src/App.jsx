import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navibar from "./components/Navbar";
import UserSettings from "./components/UserSettings";
import Homepage from "./components/Homepage";
import Login from './components/Login';
import Register from './components/Register';
import Expenses from './components/Expenses';
import Statistic from './components/Statistic';
import WelcomeBox from './components/WelcomeBox';
import "./App.css";


const App = () => {
  return (
    <Router>
        <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();

  const navbarRoutes = ["/expenses","/statistic","/usersetting"];
  const showNavbar = navbarRoutes.includes(location.pathname);

  return(
    <div className='app-container'>
      {showNavbar && <Navibar />}
      {showNavbar && <WelcomeBox />}
      <div className='content'>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/expenses" element={<Expenses/>}/>
          <Route path="/statistic" element={<Statistic/>}/>
          <Route path="/usersetting" element={<UserSettings/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;