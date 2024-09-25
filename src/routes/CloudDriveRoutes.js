// CloudDriveRoutes.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute.js';
import CloudDrive from '../pages/CloudDrive.js';

const CloudDriveRoutes = () => (
    <Switch>
        <PrivateRoute exact path="/cloud-drive" component={CloudDrive} />
    </Switch>
);

export default CloudDriveRoutes;
