import React, { useState } from 'react';
import './App.css';
import HomePage from './components/HomePage';


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
        <HomePage/>
    </div>
  );
}

export default App;
