import React from 'react';
import ReactDOM from "react-dom";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Footer from './components/common/Footer';
import Navbar from './components/common/Navbar';
import Home from './components/homepage/Home';
import Team from './components/team/Team';
import Login from './components/user/Login';
import Register from './components/user/Register';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPass from './components/user/ForgotPass';
import Profile from './components/user/Profile';
import VTA from './components/vta/Vta';
import VtoA from './components/vta/VtoA';
// import Wsurf from './components/vta/wavesurfer';

export default function App() {
  return (
    <>
    <Navbar/>
    <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgetpassword" element={<ForgotPass />} />
          <Route path="/register" element={<Register />} />
          <Route path="/video-to-audio" element={<VTA />} />
          <Route path="/video-to-audio/:id" element={<VtoA />} />
          {/* <Route path="/test" element={<Wsurf />} /> */}
        </Routes>
      </BrowserRouter>
    <Footer/>
    </>
  );
}

ReactDOM.render(<React.StrictMode>
  <App />
</React.StrictMode>,
document.getElementById('root'));