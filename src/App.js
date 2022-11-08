import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CommonLayout from './layouts/CommonLayout';
import AdminLayout from './layouts/AdminLayout';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import { useSelector } from 'react-redux';
import SavePage from './pages/SavePage';
import Login from './pages/components/Admin/Login';
import Upload from './pages/components/Admin/Upload';
import ListVideo from './pages/components/Admin/ListVideo';

function App() {
  
  const loginUser = useSelector(state => state.user.current.data);
  const isLoggedInUser = loginUser && Object.keys(loginUser).length > 0;

  return (
    <Router>
      <Routes>
        <Route element={<CommonLayout />}>
          <Route path="/" element={<HomePage />} />
          {
            isLoggedInUser
              && 
            <>
              <Route path="/user" element={<UserPage />} />
              <Route path="/bookmarks" element={<SavePage />} />
            </>
          }
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />} >
          <Route path="/admin/dashboard" element={<AdminPage />} >
            <Route index element={<ListVideo />} />
            <Route path="/admin/dashboard/upload" element={<Upload />} />
          </Route>
          <Route path="/admin/login" element={<Login />} />
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
