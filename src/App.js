import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CommonLayout from './layouts/CommonLayout';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useSelector } from 'react-redux';
import SavePage from './pages/SavePage';
import AdminPage from './pages/AdminPage';

function App() {
  const login = useSelector(state => state.user.current.data);
  const isLoggedIn = login && Object.keys(login).length > 0;
  return (
    <Router>
      <Routes>
        <Route element={<CommonLayout />}>
          <Route path="/" element={<HomePage />} />
          {
            isLoggedIn
              && 
            <>
              <Route path="/user" element={<UserPage />} />
              <Route path="/bookmarks" element={<SavePage />} />
            </>
          }
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
