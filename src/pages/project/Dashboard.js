// src/pages/Dashboard.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram, faTasks, faUsers, faChartLine } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
    return (
        <Container fluid className="dashboard">
            <Row className="mb-4">
                <Col>
                    <h2>Dashboard</h2>
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <Card className="text-center">
                        <Card.Body>
                            <FontAwesomeIcon icon={faProjectDiagram} size="3x" className="mb-3" />
                            <Card.Title>Projects</Card.Title>
                            <Card.Text>
                                10 Active Projects
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center">
                        <Card.Body>
                            <FontAwesomeIcon icon={faTasks} size="3x" className="mb-3" />
                            <Card.Title>Tasks</Card.Title>
                            <Card.Text>
                                25 Tasks Pending
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center">
                        <Card.Body>
                            <FontAwesomeIcon icon={faUsers} size="3x" className="mb-3" />
                            <Card.Title>Team Members</Card.Title>
                            <Card.Text>
                                5 Active Members
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center">
                        <Card.Body>
                            <FontAwesomeIcon icon={faChartLine} size="3x" className="mb-3" />
                            <Card.Title>Progress</Card.Title>
                            <Card.Text>
                                70% Overall Completion
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
