// src/pages/SignIn.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import storageUtil from '../utils/storageUtil';

const SignIn = () => {
    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        // Check localStorage for Authentication state when the component mounts
        const storedAuth = storageUtil.getItem('isAuthenticated');
        if (storedAuth === true) {
            navigate('/'); // Navigate to dashboard if user is authenticated
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        const success = await login(userID, password);
        if (success) {
            navigate('/');
        } else {
            setError('Invalid ID or Password');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Row>
                <Col>
                    <h2>Sign In</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formUserID" className="mb-3">
                            <Form.Label>User ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your ID"
                                value={userID}
                                onChange={(e) => setUserID(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        {error && <p className="text-danger">{error}</p>}
                        <Button variant="primary" type="submit">
                            Sign In
                        </Button>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default SignIn;
