// src/components/specific/ProjectList.js

import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchProjects } from '../../services/api';
import '../../assets/styles/ProjectList.css'; // Custom styles

const ProjectList = () => {
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects().then(data => {
            setProjects(data.documents);
            setLoading(false);
        }).catch(error => {
            console.error("Error fetching projects:", error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading projects...</div>;
    }

    const handleViewDetails = (projectID) => {
        navigate(`/projects/${projectID}`);
    };

    return (
        <Container>
            <h1 className="mb-4">Projects</h1>
            <Row>
                {projects.length > 0 ? (
                    projects.map(project => (
                        <Col key={project.projectID} md={6} lg={4} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{project.name}</Card.Title>
                                    <Card.Text>
                                        <strong>Client:</strong> {project.client} <br />
                                        <strong>Managed By:</strong> {project.managedByName} <br />
                                        <strong>Start Date:</strong> {new Date(project.startDate).toLocaleDateString()} <br />
                                        <strong>End Date:</strong> {new Date(project.endDate).toLocaleDateString()} <br />
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => handleViewDetails(project.projectID)}>
                                        View Details
                                    </Button>                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>No projects found.</p>
                )}
            </Row>
        </Container>
    );
};

export default ProjectList;
