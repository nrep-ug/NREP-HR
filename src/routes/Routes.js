// Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import CloudDriveRoutes from './CloudDriveRoutes';

const Routes = () => (
    <Router>
        <Switch>
            <Route path="/" component={Home} exact />
            <CloudDriveRoutes />
            {/* Other routes */}
        </Switch>
    </Router>
);

export default Routes;
