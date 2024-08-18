// src/services/api.js

const serverUrl = `http://localhost:3005`

// USER/STAFF APIs
export const fetchUsers = async () => {
    try {
        const response = await fetch(`${serverUrl}/api/staff/all-staff/`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
};


// PROJECT APIs
export const createProject = async (projectData) => {
    try {
        const response = await fetch(`${serverUrl}/api/project/create-project`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectData)
        });
        return await response.json();
    } catch (error) {
        console.error('Error creating project:', error);
        return { success: false };
    }
};

export const fetchProjects = async () => {
    try {
        const response = await fetch(`${serverUrl}/api/project/all-projects/`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching projcets:', error);
        return [];
    }
}

export const fetchProjectDetails = async (projectID) => {
    try {
        const response = await fetch(`${serverUrl}/api/project/${projectID}`); // Replace with your actual API endpoint
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching project details:', error);
        return null;
    }
};

export const fetchProjectTeam = async (projectID) => {
    try {
        const response = await fetch(`${serverUrl}/api/project/${projectID}/team`); // Replace with your actual API endpoint
        const data = await response.json();
        return { members: data.documents };
    } catch (error) {
        console.error('Error fetching team members:', error);
        return { members: [] };
    }
};

// src/services/api.js

export const addTeamMembers = async (projectID, members) => {
    try {
        console.log('adding team members: ', members);
        const response = await fetch(`${serverUrl}/api/project/${projectID}/add-members`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ projectID, members })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding team members:', error);
        throw error;
    }
};

