import { useEffect } from 'react'
import axiosInstance from '../services/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import useRefreshToken from '../hooks/useRefreshToken';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function useAxios() {
    const { accessToken } = useSelector(state => state.auth);
    const refreshToken = useRefreshToken();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        // Request Interceptor (attach token to requests)
        const responseInterceptor = axiosInstance.interceptors.request.use(
            (config) => {
                if (accessToken) {
                    config.headers.set("Authorization", `Bearer ${accessToken}`);
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        )

        // response interceptor(Handle token expiry)
        const requestInterceptor = axiosInstance.interceptors.response.use(
            response => response,
            async (error) => {
                const originalRequest = error.config;

                if (error.response?.status === 401) {
                    try {
                        // Attempt refresh new access token
                        const newAccessToken = await refreshToken();
                        if (!newAccessToken) {
                            dispatch(logout());
                            navigate("/signin");
                            return Promise.reject(error);
                        }

                        // retry the original request with new access token
                        originalRequest.headers.set("Authorization", `Bearer ${newAccessToken}`);
                        return axiosInstance(originalRequest);

                    } catch (refreshError) {
                        console.error("Token refresh failed: ".refreshError.message);
                        dispatch(logout());
                        navigate("/signin");
                    }
                }


                // if not a 401 authorization error, reject promise as usual
                return Promise.reject(error);
            }
        )

        return () => {
            axiosInstance.interceptors.response.eject(responseInterceptor);
            axiosInstance.interceptors.request.eject(requestInterceptor);
        }

    }, [refreshToken, navigate, accessToken])

    return axiosInstance;

}
