import { useState } from "react";
import "./UserSettings.css";

const UserSettings = () => {
  const [categories, setCategories] = useState([
    { name: "Category 1", limit: "$500" },
    { name: "Category 2", limit: "$200" },
    { name: "Category 3", limit: "$300" },
  ]);

  const addCategory = () => {
    setCategories([...categories, { name: "New Category", limit: "$0" }]);
  };

  return (
    <div className="user-settings">
      <header>
        <h2>User Settings</h2>
        <div className="welcome-box">
          <span>Welcome back, <b>Username</b></span>
          <button className="logout-button">Logout</button>
        </div>
      </header>
      <form className="settings-form">
        <label>
          Username:
          <input type="text" placeholder="Enter username" />
        </label>
        <label>
          Password:
          <input type="password" placeholder="Enter password" />
        </label>
        <label>
          Budget Categories & Limit:
          <table className="budget-table">
            <thead>
              <tr>
                <th>Budget Categories</th>
                <th>Monthly Limit</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index}>
                  <td>{category.name}</td>
                  <td>{category.limit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </label>
        <button type="button" className="add-category-button" onClick={addCategory}>
          + Add category
        </button>
      </form>
    </div>
  );
};

export default UserSettings;
