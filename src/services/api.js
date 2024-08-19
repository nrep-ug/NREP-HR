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
        const response = await fetch(`${serverUrl}/api/projects/create-project`, {
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
        const response = await fetch(`${serverUrl}/api/projects/all-projects/`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching projcets:', error);
        return [];
    }
}

export const fetchProjectDetails = async (projectID) => {
    try {
        const response = await fetch(`${serverUrl}/api/projects/${projectID}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching project details:', error);
        return null;
    }
};

export const fetchProjectTeam = async (projectID) => {
    try {
        const response = await fetch(`${serverUrl}/api/projects/${projectID}/team`);
        const data = await response.json();
        return { members: data.documents };
    } catch (error) {
        console.error('Error fetching team members:', error);
        return { members: [] };
    }
};

export const addTeamMembers = async (projectID, members) => {
    try {
        console.log('adding team members: ', members);
        const response = await fetch(`${serverUrl}/api/projects/${projectID}/add-members`, {
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

// PROJECT TASK APIs
export const fetchProjectTasks = async (projectID) => {
    try {
        const response = await fetch(`${serverUrl}/api/projects/${projectID}/tasks/`);
        const data = await response.json();
        console.log(data);
        if (data.documents.length > 0) {

            return { tasks: data.documents };
        }
        else {
            return { tasks: [] }
        }
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return { tasks: [] };
    }
};

export const fetchTaskDetails = async (projectID, taskID) => {
    try {
        const response = await fetch(`${serverUrl}/api/projects/${projectID}/tasks/${taskID}`);
        const data = await response.json();
        // console.log('Returned task details: ', data);
        return data.documents[0];
    } catch (error) {
        console.error('Error fetching task details:', error);
        return null;
    }
};

export const createTask = async (taskData) => {
    try {
        console.log('Creating task ... ', taskData);
        const response = await fetch(`${serverUrl}/api/projects/${taskData.projectID}/tasks/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([taskData])
        });
        const data = await response.json();

        // console.log('Created task: ', data);

        return { success: true, task: data.task };
    } catch (error) {
        console.error('Error creating task:', error);
        return { success: false };
    }
};

export const assignTaskMembers = async (projectID, taskID, members) => {
    try {
        console.log('Assigning task members: ', members);
        const response = await fetch(`${serverUrl}/api/projects/${projectID}/tasks/${taskID}/assign-members`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ members })
        });
        return await response.json();
    } catch (error) {
        console.error('Error assigning members to task:', error);
        throw error;
    }
};

//STARTING FROM HERE: Thinking of whether to also pass the project ID
export const fetchProjectTaskTeam = async (projectID, taskID) => {
    try {
        const response = await fetch(`${serverUrl}/api/projects/${projectID}/tasks/${taskID}/members`);
        const data = await response.json();
        return data.documents; // Assuming the API returns { members: [...] }
    } catch (error) {
        console.error('Error fetching task members:', error);
        return [];
    }
};