import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CommonLayout from './layouts/CommonLayout';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useSelector } from 'react-redux';

function App() {
  const login = useSelector(state => state.user.current)
  
  return (
    <Router>
      <Routes>
        <Route element={<CommonLayout />}>
          <Route path="/" element={<HomePage />} />
          {
            Object.values(login).length !== 0
              && 
            <Route path="/user" element={<UserPage />} />
          }
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
