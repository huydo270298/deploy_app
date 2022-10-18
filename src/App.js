import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CommonLayout from './layouts/CommonLayout';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<CommonLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<UserPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
