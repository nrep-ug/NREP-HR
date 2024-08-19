// src/pages/TaskDetailsPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button, ListGroup } from 'react-bootstrap';
import { fetchTaskDetails, fetchProjectTeam, fetchProjectTaskTeam, assignTaskMembers } from '../services/api';
import AddTeamMembersModal from '../components/common/AddTeamMembersModal';
import '../assets/styles/TaskDetailsPage.css'; // Custom styles

const TaskDetailsPage = () => {
    const { projectID, taskID } = useParams();
    const [task, setTask] = useState(null);
    const [teamMembers, setTeamMembers] = useState([]);
    const [assignedMembers, setAssignedMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAssignMemberModal, setShowAssignMemberModal] = useState(false);

    useEffect(() => {
        const fetchTaskAndTeamDetails = async () => {
            try {
                // Fetch task details
                const taskData = await fetchTaskDetails(projectID, taskID);
                setTask(taskData);

                // Fetch task members
                const taskMembers = await fetchProjectTaskTeam(projectID, taskID);
                setAssignedMembers(taskMembers);

                // Fetch project team members
                const teamData = await fetchProjectTeam(projectID);
                const projectTeam = teamData.members.map(staff => ({
                    value: staff.staffID,
                    label: staff.name
                }));
                setTeamMembers(projectTeam);

            } catch (error) {
                console.error("Error fetching task or team details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTaskAndTeamDetails();
    }, [projectID, taskID]);

    const handleMembersAssigned = async (newMembers) => {
        try {
            await assignTaskMembers(projectID, taskID, newMembers); // Assign members to task via API
            const updatedMembers = [...assignedMembers, ...newMembers];
            setAssignedMembers(updatedMembers);
        } catch (error) {
            console.error("Error assigning members to task:", error);
        }
    };

    if (loading) {
        return <div>Loading task details...</div>;
    }

    return (
        <Container>
            <h1 className="mb-4">{task.name}</h1>
            <Card>
                <Card.Body>
                    <p><strong>Description:</strong> {task.description}</p>
                    <p><strong>Start Date:</strong> {new Date(task.startDate).toLocaleDateString()}</p>
                    <p><strong>End Date:</strong> {new Date(task.endDate).toLocaleDateString()}</p>
                    <h5>Assigned Members</h5>
                    <ListGroup variant="flush">
                        {assignedMembers.length > 0 ? (
                            assignedMembers.map((member, index) => (
                                <ListGroup.Item key={index}>
                                    <strong>{member.name}</strong> - {member.role}
                                </ListGroup.Item>
                            ))
                        ) : (
                            <p>No members assigned to this task.</p>
                        )}
                    </ListGroup>
                    <Button
                        variant="primary"
                        className="mt-3"
                        onClick={() => setShowAssignMemberModal(true)}
                    >
                        Assign Member
                    </Button>
                </Card.Body>
            </Card>

            <AddTeamMembersModal
                show={showAssignMemberModal}
                handleClose={() => setShowAssignMemberModal(false)}
                onSaveMembers={handleMembersAssigned}
                existingMembers={assignedMembers} // Pass existing task members to prevent re-assigning
                availableMembers={teamMembers} // Pass project team members to filter the dropdown
            />
        </Container>
    );
};

export default TaskDetailsPage;
