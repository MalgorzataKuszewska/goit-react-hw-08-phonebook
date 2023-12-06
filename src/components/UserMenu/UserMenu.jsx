import React from 'react';

const UserMenu = ({ userEmail, onLogout }) => {
  return (
    <div>
      <p>{userEmail}</p>
      <button onClick={onLogout}>Wyloguj</button>
    </div>
  );
};

export default UserMenu;
