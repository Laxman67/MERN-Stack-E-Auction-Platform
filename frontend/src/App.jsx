import './index.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideDrawer from './layout/SideDrawer';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SubmitCommission from './pages/SubmitCommission';

const App = () => {
  return (
    <Router>
      <SideDrawer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/submit-commission' element={<SubmitCommission />} />
        <Route />
      </Routes>

      <ToastContainer position='top-right' />
    </Router>
  );
};

export default App;
