// src/pages/ProjectTeam.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button, ListGroup } from 'react-bootstrap';
import { fetchProjectTeam, fetchUsers, addTeamMembers } from '../services/api';
import AddTeamMembersModal from '../components/common/AddTeamMembersModal';
import '../assets/styles/ProjectTeam.css'; // Custom styles

const ProjectTeam = () => {
    const { projectID } = useParams();
    const [teamMembers, setTeamMembers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddMemberModal, setShowAddMemberModal] = useState(false);

    useEffect(() => {
        const fetchTeamAndUsers = async () => {
            try {
                const teamData = await fetchProjectTeam(projectID);
                console.log('ProjectID: ', projectID + ' Project Team: ', teamData);
                setTeamMembers(teamData.members);

                const userData = await fetchUsers();
                const users = userData.documents.map(staff => ({
                    value: staff.staffID,
                    label: `${staff.firstName} ${staff.middleName ? staff.middleName + ' ' : ''}${staff.surName}`.trim()
                }));
                setAllUsers(users);

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeamAndUsers();
    }, [projectID]);

    const handleSaveMembers = async (newMembers) => {
        console.log('new members: ', newMembers);
        await addTeamMembers(projectID, newMembers); // Save members via API
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
                onSaveMembers={handleSaveMembers} // Pass save function
                existingMembers={teamMembers} // Pass existing members to filter out
                availableMembers={allUsers} // Pass all users to filter and select from
            />
        </Container>
    );
};

export default ProjectTeam;
