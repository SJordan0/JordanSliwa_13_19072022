import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import SignIn from './Pages/SignIn'
import Profil from './Pages/Profil';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Profil" element={<Profil />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
