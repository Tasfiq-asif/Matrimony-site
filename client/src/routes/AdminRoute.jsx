
import { Navigate } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"
import useRole from "../hooks/useRole"
import PropTypes from "prop-types";


function AdminRoute({children}) {
    const [role,isLoading] = useRole()
    
    if (isLoading) return <LoadingSpinner/>
    if (role === "admin") return children
    return <Navigate to={'/dashboard'}/>
 
}

export default AdminRoute
AdminRoute.propTypes = {
  children: PropTypes.element,
};