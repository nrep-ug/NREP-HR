// src/pages/ProjectTeam.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button, ListGroup } from 'react-bootstrap';
import { fetchProjectTeam } from '../services/api';
import AddTeamMembersModal from '../components/common/AddTeamMembersModal';
import '../assets/styles/ProjectTeam.css'; // Custom styles

const ProjectTeam = () => {
    const { projectID } = useParams();
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddMemberModal, setShowAddMemberModal] = useState(false);

    useEffect(() => {
        fetchProjectTeam(projectID).then(data => {
            setTeamMembers(data.members);
            setLoading(false);
        }).catch(error => {
            console.error("Error fetching team members:", error);
            setLoading(false);
        });
    }, [projectID]);

    const handleMembersAdded = (newMembers) => {
        const updatedMembers = [...teamMembers, ...newMembers];
        setTeamMembers(updatedMembers);
    };

    if (loading) {
        return <div>Loading team members...</div>;
    }

    return (
        <Container>
            <h1 className="mb-4">Project Team</h1>
            <Card>
                <Card.Body>
                    <ListGroup variant="flush">
                        {teamMembers.length > 0 ? (
                            teamMembers.map((member, index) => (
                                <ListGroup.Item key={index}>
                                    <strong>{member.name}</strong> - {member.role}
                                </ListGroup.Item>
                            ))
                        ) : (
                            <p>No team members found.</p>
                        )}
                    </ListGroup>
                    <Button
                        variant="primary"
                        className="mt-3"
                        onClick={() => setShowAddMemberModal(true)}
                    >
                        Add Member
                    </Button>
                </Card.Body>
            </Card>

            <AddTeamMembersModal
                show={showAddMemberModal}
                handleClose={() => setShowAddMemberModal(false)}
                projectID={projectID}
                onMembersAdded={handleMembersAdded}
                existingMembers={teamMembers} // Pass existing members to the modal
            />
        </Container>
    );
};

export default ProjectTeam;
