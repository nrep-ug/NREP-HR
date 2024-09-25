// src/pages/project/ProjectDetails.js

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { fetchProjectDetails } from '../../services/api.js';
import Loader from '../../components/common/Loader.js'
import '../../assets/styles/ProjectDetails.css'; // Custom styles

const ProjectDetails = () => {
    console.log('Project Details Page')
    const { projectID } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjectDetails(projectID).then(data => {
            setProject(data);
            setLoading(false);
        }).catch(error => {
            console.error("Error fetching project details:", error);
            setLoading(false);
        });
    }, [projectID]);

    if (loading) {
        return <Loader />
    }

    if (!project) {
        return <div>Project not found.</div>;
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>{project.name}</Card.Title>
                    <Card.Text>
                        <strong>Description:</strong> {project.description} <br />
                        <strong>Client:</strong> {project.client} <br />
                        <strong>Managed By:</strong> {project.managedBy} <br />
                        <strong>Start Date:</strong> {new Date(project.startDate).toLocaleDateString()} <br />
                        <strong>End Date:</strong> {new Date(project.endDate).toLocaleDateString()} <br />
                        <strong>Fund Source:</strong> {project.fundSource} <br />
                    </Card.Text>
                    <Button variant="success" as={Link} to={`/project/${projectID}/team`}>
                        View Project Team
                    </Button>{' '}
                    <Button variant="warning" as={Link} to={`/project/${projectID}/tasks`}>
                        View Project Tasks
                    </Button>
                </Card.Body>
            </Card>
        </>
    );
};

export default ProjectDetails;
