import { useNavigate } from 'react-router-dom';

function useLogout() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');  // Remove token from local storage
        localStorage.removeItem('userId');  // Optional: remove userId if stored
        navigate('/login');  // Redirect to login page
    };

    return logout;
}

export default useLogout;
