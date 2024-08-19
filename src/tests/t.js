// src/components/common/AddTeamMembersModal.js

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ListGroup, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { fetchUsers } from '../../services/api';

const AddTeamMembersModal = ({
    show,
    handleClose,
    onSaveMembers,
    existingMembers = [],
    initialMembers = []
}) => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [role, setRole] = useState('');
    const [teamMembers, setTeamMembers] = useState(initialMembers);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    console.log('existingMembers', existingMembers)
    console.log('initialMembers', initialMembers)

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
            setUsers(modifiedArray);
        });
    }, []);

    useEffect(() => {
        // Filter out users that are already part of the existing members
        const existingMemberIDs = existingMembers.map(member => member.staffID);
        const filtered = users.filter(user => !existingMemberIDs.includes(user.value));
        setFilteredUsers(filtered);
    }, [users, existingMembers]);

    const handleAddMember = () => {
        if (selectedMember && role.trim()) {
            const newMember = {
                staffID: selectedMember.value,
                name: selectedMember.label,
                role: role
            };
            setTeamMembers([...teamMembers, newMember]);
            setSelectedMember(null);
            setRole('');
        }
    };

    const handleRemoveMember = (index) => {
        const updatedMembers = teamMembers.filter((_, i) => i !== index);
        setTeamMembers(updatedMembers);
    };

    const handleSave = async () => {
        setLoading(true);
        setError(null);
        try {
            console.log('Memberas to be saved: ', teamMembers);
            await onSaveMembers(teamMembers);
            handleClose();
        } catch (err) {
            setError('Failed to save members. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Team Members</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="formMemberSelect">
                        <Form.Label column sm={2}>Member</Form.Label>
                        <Col sm={10}>
                            <Select
                                options={filteredUsers} // Use the filtered users list
                                value={selectedMember}
                                onChange={setSelectedMember}
                                placeholder="Select a member"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formMemberRole">
                        <Form.Label column sm={2}>Role</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                placeholder="Enter role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Button variant="success" onClick={handleAddMember} disabled={!selectedMember || !role.trim()}>
                        Add Member
                    </Button>
                </Form>

                <ListGroup className="mt-3">
                    {teamMembers.map((member, index) => (
                        <ListGroup.Item key={index}>
                            {member.name} - {member.role}
                            <Button
                                variant="danger"
                                size="sm"
                                className="float-right"
                                onClick={() => handleRemoveMember(index)}
                            >
                                Remove
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                {error && <p className="text-danger mt-3">{error}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} disabled={loading}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave} disabled={teamMembers.length === 0 || loading}>
                    {loading ? 'Saving...' : 'Save Members'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddTeamMembersModal;