import { useDispatch } from 'react-redux';
import axiosInstance from "../services/axiosInstance";
import { login } from "../features/auth/authSlice";

export default function useRefreshToken() {
    const dispatch = useDispatch();

    const refresh = async () => {
        try {
            const { data } = await axiosInstance.get("/api/v1/auth/refresh-token");
            dispatch(login({ user: { ...data.user }, accessToken: data.accessToken }))
            return data.accessToken;
        } catch (err) {
            console.error(err);
            return null;
        }
    }
    return refresh;
}
