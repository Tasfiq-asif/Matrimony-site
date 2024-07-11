import { Navigate, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import LoadingSpinner from "../components/LoadingSpinner"
import PropTypes from "prop-types";

function PrivateRoute({children}) {
    const {user,loading} = useAuth(0)
    const location = useLocation()
    if (loading) return <LoadingSpinner/>
    if(user) return children

  return <Navigate to={'/login'} state={location.pathname} replace ='true'></Navigate>}
  PrivateRoute.propTypes = {
    children: PropTypes.element,
  };

export default PrivateRoute