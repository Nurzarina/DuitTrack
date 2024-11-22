import "./Expenses.css";
import { useState, useEffect } from "react";
import { Button, Container, Table, Form, Row, Col, FormLabel } from "react-bootstrap";
import axios from "axios";
import { useFetcher } from "react-router-dom";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    user_id:"",
    category_id:"",
    date: "",
    amount: "",
    notes: "",
  });

  const user_id = localStorage.getItem("user_id"); // Get user_id from localStorage

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  // Fetch expenses data from backend
  const fetchExpenses = async () => {
    const { data } = await axios.get("http://localhost:5000/expenses");
    setExpenses(data);
  };

  // Fetch categroies information from backend
  const fetchCategories = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/categories/${user_id}`);
    setCategories(data);
  };

  // Handle user input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

// Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const expenseData = { ...form, user_id }; // Attach user_id to form data

    try {
      await axios.post("http://localhost:5000/expenses", expenseData);
      alert("Expense added successfully!");
      fetchExpenses();
      setForm({
        category_id:"",
        date:"",
        amount:"",
        notes:"",
      });
    } catch (error) {
      console.error(error);
      alert("Error adding expense");
    }
  }

  // Function to add expense from user
  const addExpense = async () => {
    await axios.post("http://localhost:5000/expenses", form);
    fetchExpenses();
    setForm({ date: "", category: "", amount: "", notes: "" });
  };

  const deleteExpense = async (id) => {
    await axios.delete(`http://localhost:5000/expenses/${id}`);
    fetchExpenses();
  };

  return (
    <div className="expenses-bg">
      <div id="expenses-title">
        <h2><b>Expenses</b></h2>
      </div>

      <div className="expenses-wrapper">
      <Container id="expenses-container">

          <Row className="expense-form-row">
          <Form className="expense-form">
          <select>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <input name="date" type="date" value={form.date} onChange={handleInputChange} />
          <input name="amount" type="number" placeholder="Amount (RM)" value={form.amount} onChange={handleInputChange} />
          <textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleInputChange} />
          <Button id="add-expense-button" onClick={addExpense}>+ Add New Expense</Button>
          </Form>
          </Row>

          <Row className="expense-table-row">
            <h4>All Expenses</h4>
        <Table className="expense-table-list">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.date}</td>
                <td>{expense.category}</td>
                <td>{expense.amount}</td>
                <td>{expense.notes}</td>
                <td>
                  <Button id="edit-expense-button">Edit</Button>
                  <Button id="delete-expense-button" onClick={() => deleteExpense(expense.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </Row>

      </Container>
      </div>
    </div>
  );
};

export default Expenses