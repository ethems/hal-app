import React from 'react';
import 'material-design-icons/iconfont/material-icons.css';
import 'material-components-web/dist/material-components-web.css'
import './styles/app.scss';
import './styles/buttons.scss';
import './styles/icons.scss';
import './styles/main.scss';
import './styles/dropdown.scss';

const App = ({children}) => (
  <div className="app-container">
    {children}
  </div>
);

export default App;
