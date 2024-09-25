import React, { useState } from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram, faTasks, faUsers, faPlus, faHdd, faDashboard } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../../assets/styles/Sidebar.css';  // We will add some basic styling here

const Sidebar = () => {
    const [openModule, setOpenModule] = useState(null);

    const handleToggle = (module) => {
        setOpenModule(openModule === module ? null : module);
    };

    return (
        <div className="sidebar">
            <Nav className="flex-column">
                <Nav.Item>
                    <div className="nav-link" onClick={() => handleToggle('projects')}>
                        <FontAwesomeIcon icon={faDashboard} /> Projects
                    </div>
                    {openModule === 'projects' && (
                        <div className="nav-dropdown">
                            <Nav.Link as={Link} to="/project/dashboard">
                                <FontAwesomeIcon icon={faProjectDiagram} /> Dashboard
                            </Nav.Link>
                            <Nav.Link as={Link} to="/project/list">
                                <FontAwesomeIcon icon={faProjectDiagram} /> All Projects
                            </Nav.Link>
                            <Nav.Link as={Link} to="/project/create">
                                <FontAwesomeIcon icon={faPlus} /> Create Project
                            </Nav.Link>
                            {/* <Nav.Link as={Link} to="/project/:projectID/tasks">
                                <FontAwesomeIcon icon={faTasks} /> Tasks
                            </Nav.Link>
                            <Nav.Link as={Link} to="/project/:projectID/team">
                                <FontAwesomeIcon icon={faUsers} /> Team
                            </Nav.Link> */}
                        </div>
                    )}
                </Nav.Item>

                <Nav.Item>
                    <div className="nav-link" onClick={() => handleToggle('drive')}>
                        <FontAwesomeIcon icon={faHdd} /> Drive
                    </div>
                    {openModule === 'drive' && (
                        <div className="nav-dropdown">
                            <Nav.Link as={Link} to="/cloud-drive">
                                <FontAwesomeIcon icon={faHdd} /> My Drive
                            </Nav.Link>
                            <Nav.Link as={Link} to="/cloud-drive/shared">
                                <FontAwesomeIcon icon={faHdd} /> Shared with Me
                            </Nav.Link>
                            <Nav.Link as={Link} to="/cloud-drive/recent">
                                <FontAwesomeIcon icon={faHdd} /> Recent
                            </Nav.Link>
                            <Nav.Link as={Link} to="/cloud-drive/trash">
                                <FontAwesomeIcon icon={faHdd} /> Trash
                            </Nav.Link>
                        </div>
                    )}
                </Nav.Item>
                {/* Add more dropdowns or links as needed */}
            </Nav>
        </div>
    );
};

export default Sidebar;