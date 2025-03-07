
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForms } from '@/components/AuthForms';
import { useAuth } from '@/context/AuthContext';

const Auth = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate('/');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="page-container py-16 animate-fade-in min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-t-2 border-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container py-16 animate-fade-in">
      <div className="max-w-md mx-auto">
        <AuthForms />
      </div>
    </div>
  );
};

export default Auth;
