import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/user/user.selector';

const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // render nothing while we decide to navigate
  }

  return children;
};

export default ProtectedRoute;