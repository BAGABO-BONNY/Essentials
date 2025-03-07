
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForms } from '@/components/AuthForms';
import { useAuth } from '@/context/AuthContext';

const Auth = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="page-container py-16 animate-fade-in">
      <div className="max-w-md mx-auto">
        <AuthForms />
      </div>
    </div>
  );
};

export default Auth;
