import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import Home from './Home';
import ProtectedRoute from './hooks/ProtectedRoute';
import LeavesForm from './LeavesForm';
import Leaves from './Leaves';
import Navbar from './Navbar';
import axios from 'axios';
import Cookies from "js-cookie";
import Task from './Task';

function App() {


  useEffect(() => {
    const rotateAccessToken = async () => {
      let res = await axios.post(
        'api/token/refresh/',
        {
          refresh: localStorage.getItem('refreshToken')
        }
      )

      if (res.status === 200) {
        Cookies.set('accessToken', res.data.access)
        let resRefresh = await axios.post(
          'api/token/verify_token/',
          {
            token: Cookies.get('accessToken')
          }
        )
        
        console.log("running", res)
        if (resRefresh.status != 200) {
          redirect('http://localhost:5173/login')
        }
        else{
          redirect('http://localhost:5173/')
        }
      }
    }

    const token = Cookies.get('accessToken')
    if (!token) {
      rotateAccessToken()
    }
  }, [])


  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Wrap Component in this to make protected route */}
          <Route element={<ProtectedRoute />} >
            <Route path='/' element={<Home />} />
            <Route path='/leaveForm' element={<LeavesForm />} />
            <Route path='/leaves' element={<Leaves />} />
            <Route path='/tasks' element={<Task />} />
          </Route>

          {/* Public route */}
          <Route path='/login' element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


// tz1Td2UGmcWyTrGUz2hFrk24oFohezjX
