import React from 'react';

import './styles/admin.scss';
import './styles/normalize.css';
import './styles/skeleton.css';

const Admin = ({children}) => (
  <div className="admin-container">
    {children}
  </div>
);

export default Admin;
