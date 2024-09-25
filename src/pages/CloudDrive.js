// CloudDrive.js
import React, { useState } from 'react';
import CreateDirectoryModal from '../components/cloud-drive/CreateDirectoryModal';
import { Button } from 'react-bootstrap';

const CloudDrive = () => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [directories, setDirectories] = useState([]);

    const handleCreateDirectory = (directory) => {
        console.log('Created Directory:', directory); // You can replace this with actual API integration.
        setDirectories([...directories, directory]);
    };

    return (
        <div className="p-3">
            <h2>Cloud Drive</h2>
            <Button onClick={() => setShowCreateModal(true)} className="mb-3">
                Create Directory
            </Button>

            <CreateDirectoryModal
                show={showCreateModal}
                handleClose={() => setShowCreateModal(false)}
                onCreate={handleCreateDirectory}
            />

            <div>
                {directories.length > 0 ? (
                    directories.map((dir, index) => (
                        <div key={index} className="border p-2 mb-2">
                            <h5>{dir.directoryName}</h5>
                            <div>Assigned Users:</div>
                            <ul>
                                {dir.selectedUsers.map((userId) => {
                                    const user = usersList.find((user) => user.id === userId);
                                    return (
                                        <li key={userId}>
                                            {user?.name} - Permission: {dir.permissions[userId]}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))
                ) : (
                    <p>No directories created yet.</p>
                )}
            </div>
        </div>
    );
};

export default CloudDrive;
