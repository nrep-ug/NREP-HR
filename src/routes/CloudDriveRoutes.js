import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import CloudDrive from '../pages/drive/CloudDrive';
import MyDrive from '../pages/drive/MyDrive';
import SharedWithMe from '../pages/drive/SharedWithMe';
import Recent from '../pages/drive/RecentDrive';
// import Trash from '../pages/drive/Trash';

const CloudDriveRoutes = () => (
  <Routes>
    <Route path="/" element={<PrivateRoute element={<CloudDrive />} />} />
    <Route path="my-drive" element={<PrivateRoute element={<MyDrive />} />} />
    <Route path="shared" element={<PrivateRoute element={<SharedWithMe />} />} />
    <Route path="recent" element={<PrivateRoute element={<Recent />} />} />
    {/* <Route path="trash" element={<PrivateRoute element={<Trash />} />} /> */}
  </Routes>
);

export default CloudDriveRoutes;