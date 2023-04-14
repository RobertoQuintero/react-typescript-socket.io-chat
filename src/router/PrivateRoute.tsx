import { Navigate, } from 'react-router-dom';

type props={
  isAuthenticated:boolean
  children:JSX.Element 
}

export const PrivateRoute = ({isAuthenticated,children}:props) => {
  
  return (
    isAuthenticated
        ? children
        : <Navigate to='/auth/login' replace/>
  )
}
