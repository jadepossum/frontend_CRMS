import React,{userState} from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../hooks/userAuthContext';
function Layout() {
  return (
    <AuthProvider>
      <div className='Layout'>
        <Header />
        <Outlet/>
      </div>
    </AuthProvider>
  )
}

export default Layout