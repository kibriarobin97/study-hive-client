import { Navigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import useRole from "../hooks/useRole";
import PropTypes from 'prop-types'

const AdminRoute = ({ children }) => {

    const [role, isLoading] = useRole()

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (role === "Admin") {
        return children;
    }

    return <Navigate to='/dashboard' state={{ from: location }} replace></Navigate>
};

AdminRoute.propTypes = {
    children: PropTypes.element,
  }

export default AdminRoute;