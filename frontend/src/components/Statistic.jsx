import { Container } from "react-bootstrap";
import "./Statistic.css";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";

function Statistic() {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [categories, setCategories] = useState([]);
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [chartError, setChartError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {

        // Fetch data from backend
        const response = await axios.get("http://localhost:5000/dashboard");
        const { totalExpenses, monthlyBudget, categoryData } = response.data;

        setTotalExpenses(totalExpenses);
        setMonthlyBudget(monthlyBudget);
        setCategories(categoryData);

        // Handle chart data
        if (categoryData.length > 0) {
        const labels = categoryData.map((cat) => cat.name);
        const data = categoryData.map((cat) => cat.spent);
        setChartData({
          labels,
          datasets: [
            {
              label: "Expenses by Category",
              data,
              backgroundColor: [
                "#4caf50",
                "#2196f3",
                "#ff9800",
                "#f44336",
                "#9c27b0",
              ],
              hoverOffset: 4,
            },
          ],
        });
      } else {
        setChartError("No expense data available to visualize");
      }

        setLoading(false);
      } catch (error) {
        setChartError("Failed to load dashboard data. Please try again later.");
        setLoading(false);
        console.error("Error fetching dashboard data", error);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="statistic-bg">
      <div id="statistic-title">
        <h2>
          <b>Dashboard</b></h2>
      </div>
      <Container id="statistic-container">
        <div className="statistic-wrapper">

          {/* Total Expenses and Budget */}
          <div className="budget-summary">
            <div className="total-expenses">
              <p>Your Total Expenses</p>
              <h2>RM {totalExpenses.toLocaleString()}</h2>
            </div>
            <div className="monthly-budget">
              <p>Your Monthly Budget</p>
              <h3>RM {monthlyBudget.toLocaleString()}</h3>
            </div>
          </div>

          {/* Budget Tracker */}
          <div className="budget-tracker">
            <h2>Budget Tracker</h2>
            {categories.length > 0 ? (
              categories.map((category) => (
                <div key={category.id} className="tracker-item">
                  <p>{category.name}</p>
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{
                        width: `${(category.spent / category.limit) * 100}%`,
                      }}>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No categories found. Add categories in User Settings page to start tracking expenses.</p>
            )}
          </div>

          {/* Pie Chart */}
          <div className="monthly-statistics">
            <h2>Your Monthly Statistic</h2>
            {
              chartError ? (
                <p className="error">{chartError}</p>
              ) : (
                <Pie data={chartData} />
              )}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Statistic