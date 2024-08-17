import React from 'react';
import { Form } from 'react-bootstrap';

export const BoldFormLabel = ({ children, ...props }) => {
    return (
        <Form.Label {...props} style={{ fontWeight: 'bold' }}>
            {children}
        </Form.Label>
    );
};