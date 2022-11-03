import React from 'react';
import 'react-bootstrap'
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';

import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render((
  <Router>
   <Routes>
    <Route exact path="/" element={<App.MAIN_APP />} />
    <Route exact path="/disclaimer" element={<App.DISCLAIMER />} />
    <Route path="*" exact element={<App.MY_404 />} />
   </Routes>
  </Router>
));

reportWebVitals();
