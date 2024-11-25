// This component have the following functions:
// Fetch logged-in user's expenses data from backend
// Fetch logged-in user's budget categories information from backend
// Handle user input
// Handle form submission to add new expense
// Handle delete confirmation
// Delete expense an expense for the logged-in user
// Cancel delete


import "./Expenses.css";
import { useState, useEffect } from "react";
import { Button, Container, Table, Form, Row, Col, FormLabel } from "react-bootstrap";
import { IoMdAdd, IoMdCreate, IoMdTrash } from "react-icons/io";
import axios from "axios";
import { useFetcher } from "react-router-dom";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    category_id: "",
    date: "",
    amount: "",
    notes: "",
  });
  const [editingExpense, setEditingExpense] = useState(null);
  const [updatedExpense, setUpdatedExpense] = useState({
    category_id: "",
    date: "",
    amount: "",
    notes: "",
  });
  const [showDeleteExpenseModal, setShowDeleteExpenseModal] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

    // Get user_id from localStorage
    const user_id = localStorage.getItem("user_id"); 

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  console.log("user_id from expense page:", user_id);       // For debugging purpose

  // Fetch logged-in user's expenses data from backend
  const fetchExpenses = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/expenses/${user_id}`);
    setExpenses(data);
  };

  // Fetch logged-in user's budget categories information from backend
  const fetchCategories = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/categories/${user_id}`);
    setCategories(data);
  };

  // Handle user input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle form submission to add new expense
  const handleSubmit = async (e) => {
    e.preventDefault();

    const expenseData = { ...form, user_id }; // Attach user_id to form data

    console.log("expenseData from after user submit new expense:", expenseData);       // For debugging purpose

    try {
      await axios.post("http://localhost:5000/api/expenses", expenseData);
      alert("Expense added successfully!");
      fetchExpenses();
      setForm({
        date: "",
        amount: "",
        notes: "",
      });
    } catch (error) {
      console.error("Error adding expense", error);
      alert("Error adding expense");
    }
  }

  // Handle delete confirmation


  // Delete expense an expense for the logged-in user
  const deleteExpense = async (expense_id) => {
    await axios.delete(`http://localhost:5000/api/expenses/${expense_id}`);
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
          <h4>Add New Expense</h4>
            <Form className="expense-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select id="category" name="category_id" onChange={handleInputChange}>
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input id="date" name="date" type="date" value={form.date} onChange={handleInputChange} />
              </div>

              <div className="form-group">
                <label htmlFor="amount">Amount (RM):</label>
                <input id="amount" name="amount" type="number" placeholder="Amount (RM)" value={form.amount} onChange={handleInputChange} />
              </div>

              <div className="form-group">
                <label htmlFor="notes">Notes:</label>
                <textarea id="notes" name="notes" placeholder="Notes" value={form.notes} onChange={handleInputChange} />
              </div>

              <Button id="add-expense-button" type="submit"><IoMdAdd /> Add New Expense</Button>
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
                    <td>{new Intl.DateTimeFormat('en-MY', {dateStyle: 'medium', timeZone: 'Asia/Kuala_Lumpur'}).format(new Date(expense.date))}</td>
                    <td>{expense.category_name}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.notes}</td>
                    <td>
                      <div className="action-buttons-wrapper">
                      <Button id="edit-expense-button" className="action-buttons" variant="warning" size="sm"><IoMdCreate />Edit</Button>
                      <Button id="delete-expense-button" className="action-buttons" variant="danger" size="sm" onClick={() => confirmDeleteExpense(expense.id)}><IoMdTrash />Delete</Button>
                      </div>
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