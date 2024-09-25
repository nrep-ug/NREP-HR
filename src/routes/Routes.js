import React from 'react';
import { Route, Routes as RouterRoutes } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import WorkForm from '../components/other/WorkForm';
import PrivateRoute from './PrivateRoute';
import CloudDriveRoutes from './CloudDriveRoutes';
import ProjectRoutes from './ProjectRoutes';

const Routes = () => (
  <RouterRoutes>
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/project/*" element={<ProjectRoutes />} />
    <Route path="/staff-form" element={<WorkForm />} />
    {/* Cloud Drive Routes */}
    <Route path="/cloud-drive/*" element={<CloudDriveRoutes />} />
    {/* Add other routes here */}
  </RouterRoutes>
);

export default Routes;