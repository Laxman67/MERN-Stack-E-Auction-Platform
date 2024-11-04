import './index.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideDrawer from './layout/SideDrawer';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SubmitCommission from './pages/SubmitCommission';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUser } from './store/slices/userSlice';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';

const App = () => {
  // Get user data based on their profile
  // Root of the APP

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Router>
      <SideDrawer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/submit-commission' element={<SubmitCommission />} />
        <Route path='/how-it-works-info' element={<HowItWorks />} />
        <Route path='/about' element={<About />} />
        <Route />
      </Routes>

      <ToastContainer position='top-right' />
    </Router>
  );
};

export default App;
