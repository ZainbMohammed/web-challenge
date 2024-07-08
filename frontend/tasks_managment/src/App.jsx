import React from 'react';
import { BrowserRouter as Router , Routes , Route, Navigate } from 'react-router-dom'; 
import Home from "./pages/Home/home"
import Login from './pages/Login/login';
import Signup from './pages/Signup/signup';

const routes = (
  <Router>
    <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
      <Route path='/home' exact element={<Home />} />
      <Route path='/login' exact element={<Login />} />
      <Route path='/signup' exact element={<Signup />} />
    </Routes>
  </Router>
);

const App = () => {
  return <div>{routes}</div>
  
};

export default App;