// This component have the following functions:
// 1. Fetch categories for the logged-in user
// 2. Add a new category for the logged-in user
// 3. Start editing a category
// 4. Cancel editing
// 5. Update a category for the logged-in user
// 6. Handle delete confirmation
// 7. Delete a category for the logged-in user
// 8. Cancel delete


import { useState, useEffect } from "react";
import { Container, Table, Button, Form, Row, Col, Modal } from "react-bootstrap";
import { IoMdAdd, IoMdCreate, IoMdTrash } from "react-icons/io";
import "./UserSettings.css";
import axios from "axios";

const UserSettings = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({
        name: "",
        spending_limit: ""
    });
    const [editingCategory, setEditingCategory] = useState(null);
    const [updatedCategory, setUpdatedCategory] = useState({
        name: "",
        spending_limit: ""
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    // Get user_id from localStorage
    const userId = localStorage.getItem("user_id");

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
    const addCategory = async (event) => {
        event.preventDefault();

        if (!newCategory.name || !newCategory.spending_limit) {
            alert("Please enter both Category Name and Monthly Limit for the category.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/categories", {
                user_id: userId,
                name: newCategory.name,
                spending_limit: newCategory.spending_limit
            });
            setCategories([...categories, response.data]);
            setNewCategory({ name: "", spending_limit: "" });
        } catch (error) {

            console.log("Category Name:", newCategory.name);                        // For debugging purpose
            console.log("Monthly Limit:", newCategory.spending_limit);       // For debugging purpose

            console.error("Failed to add category:", error);
            alert("There was an error adding the category. Please try again.");
        }
    };

    // Start editing a category
    const startEditing = (category) => {
        setEditingCategory(category.id);
        setUpdatedCategory({ name: category.name, spending_limit: category.spending_limit });
    };

    // Cancel editing
    const cancelEditing = () => {
        setEditingCategory(null);
        setUpdatedCategory({ name: "", spending_limit: "" });
    }

    // Update a category for the logged-in user.
    const updateCategory = async (event, categoryId) => {
        event.preventDefault();

        if (!updatedCategory.name || !updatedCategory.spending_limit) {
            alert("Please enter both Category Name and Monthly limit for the category");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:5000/api/categories/${categoryId}`, {
                name: updatedCategory.name,
                spending_limit: updatedCategory.spending_limit,
            });

            setCategories(categories.map((category) =>
                category.id === categoryId ? response.data : category
            ));
            cancelEditing();

        } catch (error) {
            console.error("Failed to update category:", error);
            alert("There was an error updating the category. Please try again");
        }

    };

    // Handle delete confirmation
    const confirmDeleteCategory = (categoryId) => {
        setCategoryToDelete(categoryId);
        setShowDeleteModal(true);
    };

    // Delete a category for the logged-in user
    const deleteCategory = async (categoryId) => {
        if (!categoryToDelete) return;

        try {
            await axios.delete(`http://localhost:5000/api/categories/${categoryToDelete}`);
            setCategories(categories.filter(category => category.id !== categoryToDelete));
            setShowDeleteModal(false);
            setCategoryToDelete(null);
        } catch (error) {
            console.error("Failed to delete category:", error);
            alert("There was an error deleting the category. Please try again.");
        }
    };

    // Cancel delete
    const cancelDelete = () => {
        setShowDeleteModal(false);
        setCategoryToDelete(null);
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

                    <h5>Add a New Category</h5>
                    <Form className="add-category-form" onSubmit={addCategory}>
                        <Form.Group className="custom-form-group mt-4 mb-3">
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter category name"
                                value={newCategory.name}
                                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="custom-form-group mb-3">
                            <Form.Label>Monthly Limit</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter monthly limit"
                                value={newCategory.spending_limit}
                                onChange={(e) => setNewCategory({ ...newCategory, spending_limit: e.target.value })}
                            />
                        </Form.Group>
                        <Button id="add-category-button" type="submit"><IoMdAdd /> Add Category</Button>
                    </Form>

                    <Table striped bordered hover className="categories-table">
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
                                    <td>
                                        {editingCategory === category.id ? (
                                            <Form.Control
                                                type="text"
                                                value={updatedCategory.name}
                                                onChange={(e) =>
                                                    setUpdatedCategory({
                                                        ...updatedCategory,
                                                        name: e.target.value,
                                                    })
                                                }
                                            />
                                        ) : (
                                            category.name
                                        )}
                                    </td>
                                    <td>{
                                        editingCategory == category.id ? (
                                            <Form.Control
                                                type="number"
                                                value={updateCategory.spending_limit}
                                                onChange={(e) =>
                                                    setUpdatedCategory({
                                                        ...updatedCategory,
                                                        spending_limit: e.target.value,
                                                    })
                                                }
                                            />
                                        ) : (
                                            category.spending_limit
                                        )}
                                    </td>
                                    <td className="action-buttons-wrapper">
                                        {
                                            editingCategory === category.id ? (
                                                <>
                                                    <Button
                                                        variant="success"
                                                        size="sm"
                                                        className="action-buttons"
                                                        onClick={(e) => updateCategory(e, category.id)}>
                                                        Save
                                                    </Button>
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        className="action-buttons"
                                                        onClick={() => cancelEditing()}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Button variant="warning" size="sm" className="action-buttons"
                                                        onClick={() => startEditing(category)}>
                                                        <IoMdCreate />
                                                        Edit
                                                    </Button>
                                                    <Button variant="danger" size="sm" className="action-buttons"
                                                        onClick={() => confirmDeleteCategory(category.id)}
                                                    >
                                                        <IoMdTrash />
                                                        Delete
                                                    </Button>
                                                </>
                                            )}
                                    </td>
                                </tr>
                            )))}
                        </tbody>
                    </Table>

                </div>

                {/* Confirmation Modal for deleting category */}
                <Modal show={showDeleteModal} onHide={cancelDelete} centered>
                    <Modal.Header closeButton>
                        <Modal.Title> <b>Delete Confirmation</b></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this category?
                        <p><b style={{ color: "red" }}>* This action cannot be undone.</b></p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => cancelDelete()}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={() => deleteCategory()}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        </div>

    );
};

export default UserSettings;
