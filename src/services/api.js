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
