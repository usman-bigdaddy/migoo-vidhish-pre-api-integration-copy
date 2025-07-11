import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const AuthGuard = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  const location = useLocation(); 

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      setLoggedIn(!!token); 
    };

    checkToken(); 

    window.addEventListener('storage', checkToken);

    return () => window.removeEventListener('storage', checkToken);
  }, [location.pathname]); // Re-run when the route changes

  if (loggedIn === null) {
    return <div>Loading...</div>; 
  }

  return loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
};

export default AuthGuard;