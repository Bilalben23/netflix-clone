import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RedirectAuthenticatedRoute = () => {
    const { isAuthenticated } = useSelector(state => state.auth);

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default RedirectAuthenticatedRoute;
