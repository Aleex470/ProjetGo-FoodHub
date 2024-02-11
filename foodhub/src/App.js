import React, { useState } from 'react';
import './App.css';
import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <AdminPage onLogout={handleLogout} />
      ) : (
        <HomePage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
