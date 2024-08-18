// src/components/specific/ProjectForm.js

import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import Select from 'react-select';
import moment from 'moment-timezone';
import DatePickerModal from '../common/DatePickerModal';
import { fetchUsers, createProject } from '../../services/api';
import '../../assets/styles/ProjectForm.css'; // Apply the custom styling

const ProjectForm = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        managedBy: null,
        leadName: null,
        startDate: new Date(),
        endDate: new Date(),
        client: '',
        fundSource: ''
    });
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    useEffect(() => {
        fetchUsers().then(data => {
            const staffArray = data.documents;
            const modifiedArray = staffArray.map((staff) => {
                const fullName = `${staff.firstName} ${staff.middleName ? staff.middleName + ' ' : ''}${staff.surName}`.trim();
                return {
                    label: fullName,
                    value: staff.staffID
                };
            });
            const userOptions = modifiedArray;
            setUsers(userOptions);
        });
    }, []);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) {
            newErrors.name = 'Project name is required';
        }

        if (!formData.startDate) {
            newErrors.startDate = 'Start date is required';
        }

        if (!formData.endDate) {
            newErrors.endDate = 'End date is required';
        } else if (moment(formData.endDate).isBefore(moment(formData.startDate))) {
            newErrors.endDate = 'End date cannot be before start date';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSelectChange = (selectedOption) => {
        setFormData({
            ...formData,
            managedBy: selectedOption.value,
            leadName: selectedOption.label,
        });
    };

    const handleDateSelect = (date, field) => {
        setFormData({
            ...formData,
            [field]: date
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const projectData = {
                ...formData,
                startDate: moment(formData.startDate).tz('Africa/Nairobi'),
                endDate: moment(formData.endDate).tz('Africa/Nairobi'),
                createdBy: 'currentUserId' // Replace with actual user ID
            };
            console.log('Sent Form Data: ', formData);
            createProject(projectData).then(response => {
                if (response) {
                    // Handle successful project creation (e.g., redirect, show a message)
                    console.log('Project created successfully: ', response);
                } else {
                    // Handle error
                    setSubmitError('Failed to create project. Please try again.');
                    console.error('Failed to create project: ', response);
                }
            });
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {submitError && <Alert variant="danger">{submitError}</Alert>}

            <Form.Group as={Row} controlId="formProjectName">
                <Form.Label column sm={2}>Project Name</Form.Label>
                <Col sm={10}>
                    <Form.Control
                        type="text"
                        placeholder="Enter project name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        isInvalid={!!errors.name}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formProjectDescription">
                <Form.Label column sm={2}>Description</Form.Label>
                <Col sm={10}>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter project description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formManagedBy">
                <Form.Label column sm={2}>Managed By</Form.Label>
                <Col sm={10}>
                    <Select
                        options={users}
                        onChange={handleSelectChange}
                        placeholder="Select a manager"
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formStartDate">
                <Form.Label column sm={2}>Start Date</Form.Label>
                <Col sm={10}>
                    <div className="date-display">{formData.startDate ? formData.startDate.toLocaleDateString() : ''}</div>
                    <Button variant="outline-primary" onClick={() => setShowStartDatePicker(true)}>
                        Select Start Date
                    </Button>
                    <DatePickerModal
                        show={showStartDatePicker}
                        handleClose={() => setShowStartDatePicker(false)}
                        onDateSelect={(date) => handleDateSelect(date, 'startDate')}
                    />
                    {errors.startDate && <div className="text-danger">{errors.startDate}</div>}
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formEndDate">
                <Form.Label column sm={2}>End Date</Form.Label>
                <Col sm={10}>
                    <div className="date-display">{formData.endDate ? formData.endDate.toLocaleDateString() : ''}</div>
                    <Button variant="outline-primary" onClick={() => setShowEndDatePicker(true)}>
                        Select End Date
                    </Button>
                    <DatePickerModal
                        show={showEndDatePicker}
                        handleClose={() => setShowEndDatePicker(false)}
                        onDateSelect={(date) => handleDateSelect(date, 'endDate')}
                    />
                    {errors.endDate && <div className="text-danger">{errors.endDate}</div>}
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formClient">
                <Form.Label column sm={2}>Client</Form.Label>
                <Col sm={10}>
                    <Form.Control
                        type="text"
                        placeholder="Enter client name"
                        name="client"
                        value={formData.client}
                        onChange={handleInputChange}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formFundSource">
                <Form.Label column sm={2}>Fund Source</Form.Label>
                <Col sm={10}>
                    <Form.Control
                        type="text"
                        placeholder="Enter fund source"
                        name="fundSource"
                        value={formData.fundSource}
                        onChange={handleInputChange}
                    />
                </Col>
            </Form.Group>

            <Button variant="primary" type="submit">
                Create Project
            </Button>
        </Form>
    );
};

export default ProjectForm;
