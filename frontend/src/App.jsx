
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/Hero";
import Discover from './pages/Discover'; 
import Share from './pages/Share';
import Account from './pages/Account';
import ReadStory from './pages/ReadStory';

export default function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/share" element={<Share />} />
        <Route path="/account" element={<Account />} />

        <Route path="/story/:id" element={<ReadStory />} />
      </Routes>
    </Router>
  );
}
