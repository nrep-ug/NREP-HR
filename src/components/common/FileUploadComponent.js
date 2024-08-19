// src/components/common/FileUploadComponent.js

import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const FileUploadComponent = ({ fileType = [], maxSize = 5, onFileUpload }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            const fileExtension = selectedFile.name.split('.').pop();
            const fileSizeInMB = selectedFile.size / 1024 / 1024;

            if (fileType.length && !fileType.includes(fileExtension)) {
                setError(`File type must be one of the following: ${fileType.join(', ')}`);
                return;
            }

            if (fileSizeInMB > maxSize) {
                setError(`File size must be less than ${maxSize}MB`);
                return;
            }

            setError(null);
            setFile(selectedFile);
            onFileUpload(selectedFile);
        }
    };

    const handleUpload = () => {
        if (file) {
            // Implement the file upload logic here, possibly sending it to the server
            console.log("File uploaded:", file);
        }
    };

    return (
        <Form.Group>
            <Form.Label htmlFor="fileUpload">Upload File</Form.Label>
            <Form.Control
                type="file"
                id="fileUpload"
                onChange={handleFileChange}
            />
            {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
            <Button variant="primary" onClick={handleUpload} disabled={!file} className="mt-2">
                Upload
            </Button>
        </Form.Group>
    );
};

export default FileUploadComponent;
