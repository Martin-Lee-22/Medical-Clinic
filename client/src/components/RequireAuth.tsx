import {useLocation, Navigate, Outlet} from 'react-router-dom'
import useAuth from '../hooks/useAuth'

// This component protects its children routes, <Outlets/>, by forcing unauthorized users to the login/register page
// if they got to unauthorized pages somehow.
const RequireAuth = () => {
    const {auth} = useAuth();
    const location = useLocation();
    return(
        auth?.accessToken 
            ? <Outlet/>
            : <Navigate to="/" state={{from: location}} replace />
    )
}

export default RequireAuth