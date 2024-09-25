// /src/components/cloud-drive/CreateDirectoryModal.js
import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { usersList } from '../../utils/staticUsers';

const CreateDirectoryModal = ({ show, handleClose, onCreate }) => {
    const [directoryName, setDirectoryName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [permissions, setPermissions] = useState({});
    const [groupPermissions, setGroupPermissions] = useState('');

    const handleCreate = () => {
        onCreate({ directoryName, selectedUsers, permissions });
        handleClose();
    };

    const handleUserSelect = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter((id) => id !== userId));
            setPermissions((prev) => {
                const updatedPermissions = { ...prev };
                delete updatedPermissions[userId];
                return updatedPermissions;
            });
        } else {
            setSelectedUsers([...selectedUsers, userId]);
            setPermissions((prev) => ({ ...prev, [userId]: '' }));
        }
    };

    const handlePermissionChange = (userId, permission) => {
        setPermissions((prev) => ({ ...prev, [userId]: permission }));
    };

    const handleGroupPermissionChange = (permission) => {
        setGroupPermissions(permission);
        const updatedPermissions = {};
        selectedUsers.forEach((userId) => {
            updatedPermissions[userId] = permission;
        });
        setPermissions(updatedPermissions);
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Create Directory</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="directoryName">
                        <Form.Label>Directory Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={directoryName}
                            onChange={(e) => setDirectoryName(e.target.value)}
                            placeholder="Enter directory name"
                        />
                    </Form.Group>

                    <Form.Group controlId="selectUsers" className="mt-3">
                        <Form.Label>Select Users to Assign</Form.Label>
                        {usersList.map((user) => (
                            <Row key={user.id} className="mb-2 align-items-center">
                                <Col xs={4}>
                                    <Form.Check
                                        type="checkbox"
                                        label={user.name}
                                        onChange={() => handleUserSelect(user.id)}
                                        checked={selectedUsers.includes(user.id)}
                                    />
                                </Col>
                                <Col xs={8}>
                                    {selectedUsers.includes(user.id) && (
                                        <Form.Control
                                            as="select"
                                            value={permissions[user.id]}
                                            onChange={(e) => handlePermissionChange(user.id, e.target.value)}
                                        >
                                            <option value="">Select Permission</option>
                                            <option value="view">View</option>
                                            <option value="upload">Upload</option>
                                            <option value="download">Download</option>
                                            <option value="delete">Delete</option>
                                        </Form.Control>
                                    )}
                                </Col>
                            </Row>
                        ))}
                    </Form.Group>

                    <Form.Group controlId="groupPermissions" className="mt-3">
                        <Form.Label>Set Group Permission</Form.Label>
                        <Form.Control
                            as="select"
                            value={groupPermissions}
                            onChange={(e) => handleGroupPermissionChange(e.target.value)}
                        >
                            <option value="">Select Group Permission</option>
                            <option value="view">View</option>
                            <option value="upload">Upload</option>
                            <option value="download">Download</option>
                            <option value="delete">Delete</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleCreate} disabled={!directoryName}>
                    Create Directory
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateDirectoryModal;
