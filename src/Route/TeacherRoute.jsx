import { Navigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import useRole from "../hooks/useRole";
import PropTypes from 'prop-types'

const TeacherRoute = ({ children }) => {

    const [role, isLoading] = useRole()

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (role === "Teacher") {
        return children;
    }

    return <Navigate to='/dashboard' state={{ from: location }} replace></Navigate>
};

TeacherRoute.propTypes = {
    children: PropTypes.element,
  }

export default TeacherRoute;