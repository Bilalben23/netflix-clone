import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance'
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

export default function useLogout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const signOut = async () => {
        try {
            const { data } = await axiosInstance.get("/auth/logout", { withCredentials: true });
            if (data.success) {
                dispatch(logout());
                navigate("/signin", { state: { from: location.pathname } });
            }
        } catch (err) {
            console.error(err);
        }
    }

    return signOut;
}
