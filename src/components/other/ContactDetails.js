import React from 'react';
import { Form, Col, Row, Card } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';

const ContactDetails = ({ hrStyle, formData, handleChange, handlePhoneChange }) => {
    return (
        <Card className="shadow-lg p-4" style={{ backgroundColor: "#fbffff" }}>
            <Card.Footer>CONTACT DETAILS</Card.Footer>
            <Card.Body>
                <Row>
                    <Col md={6} className="mb-3">
                        <Form.Group controlId="formEmail1">
                            <Form.Label>Email 1 <b style={{ color: "red" }}>*</b></Form.Label>
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

                <hr style={hrStyle} />

                <Row>
                    <Col md={6} className="mb-3">
                        <Form.Group controlId="formPhone1">
                            <Form.Label>Phone 1 <b style={{ color: "red" }}>*</b></Form.Label>
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

                <hr style={hrStyle} />

                <Form.Group controlId="formAddress1">
                    <Form.Label>Address 1 <b style={{ color: "red" }}>*</b></Form.Label>
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
            </Card.Body>
        </Card>
    );
};

export default ContactDetails;
