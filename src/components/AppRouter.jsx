import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '../Router/Routes';
import { AuthContext } from '../context';
import Loader from './UI/Loader/Loader';

const AppRouter = () => {
  const {isAuth, isLoading} = useContext(AuthContext);
  
  if (isLoading) {
    return <Loader/>
  }

  return (
    isAuth 
      ?
        <Routes>
          {privateRoutes.map(route => 
            <Route 
            element={<route.element/>} 
            path={route.path}
            exact={route.exact}
            key={route.path}
            />
          )}
          <Route path="*" element={ <Navigate to="/posts" replace />}></Route>
        </Routes>
      :
        <Routes>
        {publicRoutes.map(route => 
          <Route 
          element={<route.element/>} 
          path={route.path}
          exact={route.exact}
            key={route.path}
          />
        )}
        <Route path="*" element={ <Navigate to="/login" replace />}></Route>
    </Routes>
    
  )
}

export default AppRouter

