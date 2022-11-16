import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CommonLayout from './layouts/CommonLayout';
import AdminLayout from './layouts/AdminLayout';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import SavePage from './pages/SavePage';
import Login from './pages/components/Admin/Login';
import Upload from './pages/components/Admin/Upload';
import ListVideo from './pages/components/Admin/ListVideo';
import HomePage from './pages/HomePage';
import './App.css';

function App() {

  const isLoggedInUser = useSelector(state => state.user.user);

  return (
    <Router basename="/">
      <Routes>
        <Route element={<CommonLayout />}>
          <Route path='/' element={<HomePage />} />
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
