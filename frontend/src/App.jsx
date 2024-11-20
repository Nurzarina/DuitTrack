import Sidebar from "./components/Sidebar";
import UserSettings from "./components/UserSettings";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <UserSettings />
      </main>
    </div>
  );
};

export default App;
