import { useState, useEffect } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
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
        if (!newCategory.name || !newCategory.limit) {
            alert("Please enter both name and limit for the category.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/categories", {
                user_id: userId,
                name: newCategory.name,
                limit: parseFloat(newCategory.limit).toFixed(2), // Format as a decimal
            });
            setCategories([...categories, response.data]);
            setNewCategory({ name: "", limit: "" });
        } catch (error) {
            console.error("Failed to add category:", error);
            alert("There was an error adding the category. Please try again.");
        }
    };

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
            <Container fluid className="user-settings-container">
                <header className="d-flex justify-content-between align-items-center mb-4">
                    <h2>User Settings</h2>

                </header>

                <h4>Budget Categories</h4>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Category Name</th>
                            <th>Monthly Limit</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={index}>
                                <td>{category.name}</td>
                                <td>{category.limit}</td>
                                <td><Button variant="danger" size="sm"
                                onClick={deleteCategory(category.id)}
                                >Delete</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Form className="mt-4">
                    <h5>Add a New Category</h5>
                    <Form.Group className="mb-3">
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
                            value={newCategory.limit}
                            onChange={(e) => setNewCategory({ ...newCategory, limit: e.target.value })}
                        />
                    </Form.Group>
                    <Button variant="success" onClick={addCategory}>+ Add Category</Button>
                </Form>
            </Container>
        </div>
    );
};

export default UserSettings;
