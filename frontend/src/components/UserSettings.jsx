import { useState, useEffect } from "react";
import { Container, Table, Button, Form, Row, Col } from "react-bootstrap";
import { IoMdAdd } from "react-icons/io";
import "./UserSettings.css";
import axios from "axios";

const UserSettings = () => {
    const [categories, setCategories] = useState([]);
    const [userId, setUserId] = useState(1); // Simulated user ID
    const [newCategory, setNewCategory] = useState({ name: "", limit: "" });

    // Fetch categories for the logged-in user
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/categories/${userId}`);
                setCategories(response.data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };
        fetchCategories();
    }, [userId]);

    // Add a new category for the logged-in user
    const addCategory = async () => {
        if (!newCategory.name || !newCategory.spending_limit) {
            alert("Please enter both name and spending_limit for the category.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/categories", {
                user_id: userId,
                name: newCategory.name,
                spending_limit: parseFloat(newCategory.spending_limit).toFixed(2), // Format as a decimal
            });
            setCategories([...categories, response.data]);
            setNewCategory({ name: "", spending_limit: "" });
        } catch (error) {
            console.error("Failed to add category:", error);
            alert("There was an error adding the category. Please try again.");
        }
    };

    // Delete a category for the logged-in user
    const deleteCategory = async (categoryId) => {
        try {
            await axios.delete(`http://localhost:5000/api/categories/${categoryId}`);
            setCategories(categories.filter(category => category.id !== categoryId));
        } catch (error) {
            console.error("Failed to delete category:", error);
            alert("There was an error deleting the category. Please try again.");
        }
    };


    return (
        <div className="user-settings-bg">
            <div id="user-settings-title">
                <h2>
                    <b>User Settings</b></h2>
            </div>

            <Container id="user-settings-container">
                <div className="category-wrapper">
                    <h4>Budget Categories & Limits:</h4>
                    <Table striped bordered hover className="budget-table">
                        <thead>
                            <tr>
                                <th>Category Name</th>
                                <th>Monthly Limit</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="text-center">
                                        You have not set up any category yet.
                                    </td>
                                </tr>
                            ) : (categories.map((category, index) => (
                                <tr key={index}>
                                    <td>{category.name}</td>
                                    <td>{category.spending_limit}</td>
                                    <td><Button variant="danger" size="sm"
                                        onClick={deleteCategory(category.id)}
                                    >Delete</Button></td>
                                </tr>
                            )))}
                        </tbody>
                    </Table>

                    <Form className="category-form">
                        <h5>Add a New Category</h5>
                        <Form.Group className="mt-4 mb-3">
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter category name"
                                value={newCategory.name}
                                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Monthly Limit</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter monthly limit"
                                value={newCategory.spending_limit}
                                onChange={(e) => setNewCategory({ ...newCategory, spending_limit: e.target.value })}
                            />
                        </Form.Group>
                        <Button id="add-category-button" onClick={addCategory}><IoMdAdd /> Add Category</Button>
                    </Form>
                </div>
            </Container>
        </div>
    );
};

export default UserSettings;
