import {  useContext } from 'react';
import { Navigate, } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

type props={
  isAuthenticated:boolean
  children:JSX.Element 
}

export const PublicRoute = ({isAuthenticated,children}:props) => {
  const {auth}= useContext(AuthContext)
  return (
    ! isAuthenticated
        ? children
        : <Navigate to='/login' replace/>
  )
}
