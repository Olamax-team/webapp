
import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';
import useUserDetails from '../stores/userStore';

interface userProps {
  UID: string;
  email: string;
  account_status: string;
  last_login_location: string;
}


const GoogleLoginCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
   const { setUser} = useUserDetails();
   
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
  
    const data = searchParams.get('data');
    console.log('Raw query string:', window.location.search);
    console.log('URLSearchParams entries:', [...searchParams.entries()]);
  
    if (data) {
      try {
        const decodedData = decodeURIComponent(data);
        const response = JSON.parse(decodedData);
        const { token, message, data: { user } } = response;
  
        const userData: userProps = {
          UID: user.UID || '',
          email: user.email || '',
          account_status: user.account_status || 'Pending',
          last_login_location: user.last_login_location || 'Location not detected.',
        };
  
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData, token);
        toast({ title: 'Success', description: message || 'Login successful!', variant: 'success' });
        hasRun.current = true;
        navigate('/dashboard', { replace: true });
      } catch (error) {
        console.error('Error parsing data:', error);
        toast({ title: 'Error', description: 'Failed to process login data', variant: 'destructive' });
        navigate('/log-in', { replace: true });
      }
    } else {
      toast({ title: 'Error', description: 'No data received', variant: 'destructive' });
      hasRun.current = true;
      navigate('/log-in', { replace: true });
    }
  }, [navigate, toast, searchParams, setUser]);
  return null;
};

export default GoogleLoginCallback;