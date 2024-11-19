import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TaskList from './components/TaskList';
import Login from './components/Login';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('access'); // Проверяем, есть ли токен

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <TaskList /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
