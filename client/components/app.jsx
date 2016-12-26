import React from 'react';
import './styles/app.scss';

require('style!material-design-icons/iconfont/material-icons.css');

const App = ({children}) => (
  <div className="app-container">
    {children}
  </div>
);

export default App;
