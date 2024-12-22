import React, { useState } from 'react';
import { User } from './types';
import Auth from './components/Auth';
import Trading from './components/Trading';
import { getCurrentUser } from './utils/storage';

function App() {
  const [user, setUser] = useState<User | null>(getCurrentUser());

  const handleLogout = () => {
    localStorage.removeItem('currentUserId');
    setUser(null);
  };

  if (!user) {
    return <Auth onAuth={setUser} />;
  }

  return (
    <Trading
      user={user}
      onUpdateUser={setUser}
      onLogout={handleLogout}
    />
  );
}

export default App;