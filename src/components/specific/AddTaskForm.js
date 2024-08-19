// src/components/specific/AddTaskForm.js

import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import DatePickerModal from '../common/DatePickerModal';
import FileUploadComponent from '../common/FileUploadComponent';
import { createTask } from '../../services/api';
import moment from 'moment-timezone';
import '../../assets/styles/AddTaskForm.css'; // Custom styles

const AddTaskForm = ({ projectID, onTaskCreated }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
        documents: []
    });
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) {
            newErrors.name = 'Task name is required';
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

    const handleDateSelect = (date, field) => {
        setFormData({
            ...formData,
            [field]: date
        });
    };

    const handleFileUpload = (file) => {
        setFormData({
            ...formData,
            documents: [...formData.documents, file]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true);
            const taskData = {
                ...formData,
                projectID: projectID,
                startDate: moment(formData.startDate).tz('Africa/Nairobi'),
                endDate: moment(formData.endDate).tz('Africa/Nairobi'),
                createdBy: 'currentUserId' // Replace with actual user ID
            };
            createTask(taskData).then(response => {
                if (response.success) {
                    onTaskCreated(response.task);
                } else {
                    setSubmitError('Failed to create task. Please try again.');
                }
                setLoading(false);
            }).catch(error => {
                console.error('Error creating task:', error);
                setSubmitError('An error occurred. Please try again.');
                setLoading(false);
            });
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {submitError && <Alert variant="danger">{submitError}</Alert>}

            <Form.Group as={Row} controlId="formTaskName">
                <Form.Label column sm={2}>Task Name</Form.Label>
                <Col sm={10}>
                    <Form.Control
                        type="text"
                        placeholder="Enter task name"
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

            <Form.Group as={Row} controlId="formTaskDescription">
                <Form.Label column sm={2}>Description</Form.Label>
                <Col sm={10}>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter task description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formStartDate">
                <Form.Label column sm={2}>Start Date</Form.Label>
                <Col sm={10}>
                    <div>{formData.startDate ? formData.startDate.toLocaleDateString() : ''}</div>
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
                    <div>{formData.endDate ? formData.endDate.toLocaleDateString() : ''}</div>
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

            <FileUploadComponent
                fileType={['pdf', 'doc', 'docx']}
                maxSize={10}
                onFileUpload={handleFileUpload}
            />

            <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Creating Task...' : 'Create Task'}
            </Button>
        </Form>
    );
};

export default AddTaskForm;
