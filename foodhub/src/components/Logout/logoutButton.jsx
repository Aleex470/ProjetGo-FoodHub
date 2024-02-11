import React from 'react';

const LogoutButton = ({ onLogout }) => {
  const handleLogout = () => {
    
    onLogout();
  };

  return (
    <button onClick={handleLogout}>
      Déconnexion
    </button>
  );
};

export default LogoutButton;