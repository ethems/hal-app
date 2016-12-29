import React from 'react';
import 'material-design-icons/iconfont/material-icons.css';

import './styles/app.scss';

const App = ({children}) => (
  <div className="app-container">
    {children}
  </div>
);

export default App;
