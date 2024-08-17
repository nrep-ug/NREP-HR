import React, { useState } from 'react';
import { Container, Card, Form, Button, Col, Row } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import DatePicker from 'react-datepicker';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import {
    CitySelect,
    CountrySelect,
    StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const WorkForm = () => {
    const [formData, setFormData] = useState({
        workID: '',
        role: '',
        customRole: '',
        staffResponsibilities: '',
        firstName: '',
        surname: '',
        middleName: '',
        sex: '',
        email1: '',
        email2: '',
        email3: '',
        phone1: '',
        phone2: '',
        phone3: '',
        dob: null,
        nationalID: '',
        tin: '',
        nssf: '',
        nationality: '',
        address1: '',
        address2: '',
        address3: '',
        country: '',
        region: '',
        city: ''
    });

    const countries = countryList().getData();

    const roles = [
        { label: 'Staff', value: 'Staff' },
        { label: 'Intern', value: 'Intern' },
        { label: 'Associate', value: 'Associate' },
        { label: 'Other', value: 'Other' },
    ];

    const sexOptions = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePhoneChange = (value, name) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            dob: date,
        });
    };

    const handleNationalityChange = (selectedOption) => {
        setFormData({
            ...formData,
            nationality: selectedOption.value,
        });
    };

    const handleCountryChange = (e) => {
        setFormData({
            ...formData,
            country: e.id,
            state: 0, // Reset state and city when country changes
            city: 0,
        });
    };

    const handleStateChange = (e) => {
        setFormData({
            ...formData,
            state: e.id,
            city: 0, // Reset city when state changes
        });
    };

    const handleCityChange = (e) => {
        setFormData({
            ...formData,
            city: e.id,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data: ', formData)
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Form submitted successfully!');
        } else {
            alert('Form submission failed.');
        }
    };

    return (
        <Container className="my-5">
            <h3 className="text-center mb-4">Staff Details</h3>
            <Form id="staffForm" onSubmit={handleSubmit}>
                {/* PERSONAL DETAILS */}
                <Card
                    className="shadow-lg p-4"
                    style={{ backgroundColor: "#fbffff" }}
                >
                    <Card.Footer>PERSONAL DETAILS</Card.Footer>
                    <Card.Body>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group controlId="formFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group controlId="formSurname">
                                    <Form.Label>Surname</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="surname"
                                        value={formData.surname}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group controlId="formMiddleName">
                                    <Form.Label>Middle Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="middleName"
                                        value={formData.middleName}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group controlId="formSex">
                            <Form.Label>Sex</Form.Label>
                            <Form.Control
                                as="select"
                                name="sex"
                                value={formData.sex}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Sex</option>
                                {sexOptions.map((sex) => (
                                    <option key={sex.value} value={sex.value}>
                                        {sex.label}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formWorkID">
                            <Form.Label>Work ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="workID"
                                value={formData.workID}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                as="select"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Role</option>
                                {roles.map((role) => (
                                    <option key={role.value} value={role.value}>
                                        {role.label}
                                    </option>
                                ))}
                            </Form.Control>
                            {formData.role === 'Other' && (
                                <Form.Control
                                    type="text"
                                    name="customRole"
                                    placeholder="Specify Role"
                                    value={formData.customRole}
                                    onChange={handleChange}
                                    required
                                />
                            )}
                        </Form.Group>

                        <Form.Group controlId="formStaffResponsibilities">
                            <Form.Label>Staff Responsibilities</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="staffResponsibilities"
                                value={formData.staffResponsibilities}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formNationalID">
                            <Form.Label>National ID or Passport Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="nationalID"
                                value={formData.nationalID}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formTIN">
                            <Form.Label>Tax Identification (TIN)</Form.Label>
                            <Form.Control
                                type="number"
                                name="tin"
                                value={formData.tin}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formNSSF">
                            <Form.Label>National Social Security Fund (NSSF) Number</Form.Label>
                            <Form.Control
                                type="number"
                                name="nssf"
                                value={formData.nssf}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formNationality">
                            <Form.Label>Nationality</Form.Label>
                            <Select
                                options={countries}
                                onChange={handleNationalityChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formDOB">
                            <Form.Label>Date of Birth</Form.Label>
                            <Calendar
                                selected={formData.dob}
                                onChange={handleDateChange}
                                dateFormat="yyyy-MM-dd"
                                className="form-control"
                                required
                            />
                        </Form.Group>
                    </Card.Body>
                </Card>

                {/* CONTACT DETAILS */}
                <Card
                    className="shadow-lg p-4"
                    style={{ backgroundColor: "#fbffff" }}
                >
                    <Card.Footer>CONTACT DETAILS</Card.Footer>
                    <Card.Body>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group controlId="formEmail1">
                                    <Form.Label>Email 1</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email1"
                                        value={formData.email1}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group controlId="formEmail2">
                                    <Form.Label>Email 2</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email2"
                                        value={formData.email2}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group controlId="formEmail3">
                                    <Form.Label>Email 3</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email3"
                                        value={formData.email3}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group controlId="formPhone1">
                                    <Form.Label>Phone 1</Form.Label>
                                    <PhoneInput
                                        country={'ug'}
                                        value={formData.phone1}
                                        onChange={(value) => handlePhoneChange(value, 'phone1')}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group controlId="formPhone2">
                                    <Form.Label>Phone 2</Form.Label>
                                    <PhoneInput
                                        country={'ug'}
                                        value={formData.phone2}
                                        onChange={(value) => handlePhoneChange(value, 'phone2')}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group controlId="formPhone3">
                                    <Form.Label>Phone 3</Form.Label>
                                    <PhoneInput
                                        country={'ug'}
                                        value={formData.phone3}
                                        onChange={(value) => handlePhoneChange(value, 'phone3')}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group controlId="formAddress1">
                            <Form.Label>Address 1</Form.Label>
                            <Form.Control
                                type="text"
                                name="address1"
                                value={formData.address1}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formAddress2">
                            <Form.Label>Address 2</Form.Label>
                            <Form.Control
                                type="text"
                                name="address2"
                                value={formData.address2}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAddress3">
                            <Form.Label>Address 3</Form.Label>
                            <Form.Control
                                type="text"
                                name="address3"
                                value={formData.address3}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        {/* <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group controlId="formCountry">
                                    <Form.Label>Country</Form.Label>
                                    <CountrySelect
                                        onChange={(e) => handleCountryChange(e)}
                                        placeHolder="Select Country"
                                        className="form-control"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group controlId="formRegion">
                                    <Form.Label>State/Region</Form.Label>
                                    <StateSelect
                                        countryid={formData.country}
                                        onChange={(e) => handleStateChange(e)}
                                        placeHolder="Select State"
                                        className="form-control"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group controlId="formCity">
                                    <Form.Label>City</Form.Label>
                                    <CitySelect
                                        countryid={formData.country}
                                        stateid={formData.state}
                                        onChange={(e) => handleCityChange(e)}
                                        placeHolder="Select City"
                                        className="form-control"
                                    />
                                </Form.Group>
                            </Col>
                        </Row> */}
                    </Card.Body>
                </Card>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default WorkForm;
