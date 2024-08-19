// src/pages/ProjectTasksPage.js

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button, ListGroup, Modal } from 'react-bootstrap';
import { fetchProjectTasks } from '../services/api';
import AddTaskForm from '../components/specific/AddTaskForm';
import Loader from '../components/common/Loader.js'
import '../assets/styles/ProjectTasksPage.css';

const ProjectTasksPage = () => {
    const { projectID } = useParams();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);

    useEffect(() => {
        console.log('Extracted Project ID from URL:', projectID);  // Log the projectID
        fetchProjectTasks(projectID).then(data => {
            console.log('Extracted Project tasks:', data)
            setTasks(data.tasks);
            setLoading(false);
        }).catch(error => {
            console.error("Error fetching tasks:", error);
            setLoading(false);
        });
    }, [projectID]);

    const handleTaskCreated = (newTask) => {
        setTasks([...tasks, newTask]);
        setShowAddTaskModal(false);

        //TODO: Implementing a function that returns the updated tasks list
    };

    if (loading) {
        return <Loader />
    }

    return (
        <Container>
            <h1 className="mb-4">Project Tasks</h1>
            <Card>
                <Card.Body>
                    <ListGroup variant="flush">
                        {tasks.length > 0 ? (
                            tasks.map((task) => (
                                <ListGroup.Item key={task.taskID}>
                                    <Link to={`/projects/${projectID}/tasks/${task.taskID}`}>
                                        <strong>{task.name}</strong>
                                    </Link>
                                    <br />
                                    <span>{task.description}</span>
                                </ListGroup.Item>
                            ))
                        ) : (
                            <p>No tasks found.</p>
                        )}
                    </ListGroup>
                    <Button
                        variant="primary"
                        className="mt-3"
                        onClick={() => setShowAddTaskModal(true)}
                    >
                        Add Task
                    </Button>
                </Card.Body>
            </Card>

            <Modal show={showAddTaskModal} onHide={() => setShowAddTaskModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddTaskForm projectID={projectID} onTaskCreated={handleTaskCreated} />
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default ProjectTasksPage;
