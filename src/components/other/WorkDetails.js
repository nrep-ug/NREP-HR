import React from 'react';
import { Form, Card } from 'react-bootstrap';

const WorkDetails = ({ hrStyle, formData, handleChange, staffCategories }) => {
    return (
        <Card className="shadow-lg p-4" style={{ backgroundColor: "#fbffff" }}>
            <Card.Footer>WORK DETAILS</Card.Footer>
            <Card.Body>
                <Form.Group controlId="formStaffID">
                    <Form.Label>Staff ID</Form.Label>
                    <Form.Control
                        type="text"
                        name="staffID"
                        value={formData.staffID}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <hr style={hrStyle} />

                <Form.Group controlId="formStaffCategory">
                    <Form.Label>Staff Category</Form.Label>
                    <Form.Control
                        as="select"
                        name="staffCategory"
                        value={formData.staffCategory}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Staff Category</option>
                        {staffCategories.map((staffCategory) => (
                            <option key={staffCategory.value} value={staffCategory.value}>
                                {staffCategory.label}
                            </option>
                        ))}
                    </Form.Control>
                    {formData.staffCategory === 'Other' && (
                        <Form.Control
                            type="text"
                            name="customStaffCategory"
                            placeholder="Specify category for staff"
                            value={formData.customStaffCategory}
                            onChange={handleChange}
                            required
                        />
                    )}
                </Form.Group>

                <hr style={hrStyle} />

                <Form.Group controlId="formRoles">
                    <Form.Label>Staff Responsibilities</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="roles"
                        value={formData.roles}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <hr style={hrStyle} />

                <Form.Group controlId="formNationalID">
                    <Form.Label>National ID or Passport Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="NIN"
                        value={formData.NIN}
                        onChange={handleChange}
                    />
                </Form.Group>

                <hr style={hrStyle} />

                <Form.Group controlId="formTIN">
                    <Form.Label>Tax Identification (TIN)</Form.Label>
                    <Form.Control
                        type="number"
                        name="TIN"
                        value={formData.TIN}
                        onChange={handleChange}
                    />
                </Form.Group>

                <hr style={hrStyle} />

                <Form.Group controlId="formNSSF">
                    <Form.Label>National Social Security Fund (NSSF) Number</Form.Label>
                    <Form.Control
                        type="number"
                        name="NSSF"
                        value={formData.NSSF}
                        onChange={handleChange}
                    />
                </Form.Group>
            </Card.Body>
        </Card>
    );
};

export default WorkDetails;
