import { ChatPage  } from '../pages';
import { AuthRouter } from './AuthRouter';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext, useEffect } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
  const {auth,verificaToken}= useContext(AuthContext)
console.log(auth)
  useEffect(() => {
    verificaToken()
  }, [])

  if(auth.checking){
    return <h1>Espere porfavor</h1>
  }

  return (
    <Router>
      <Routes>
         <Route path="auth/*" 
                element={
                <PublicRoute isAuthenticated={auth.logged}>
                  <AuthRouter/>
                </PublicRoute>
              }
         />
        
        
        <Route path="/" element={
          <PrivateRoute isAuthenticated={auth.logged}>
            <ChatPage />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to='/' />} />


        {/* <Route path="users/*" element={<Users />} /> */}
      </Routes>
    </Router>
  )
}
