
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/Hero";

import Discover from './pages/Discover'; 
import Share from './pages/Share';
import Account from './pages/Account';
import ReadStory from './pages/ReadStory';
import Auth from './pages/Auth';
import CompleteAccount from './pages/CompleteAccount';
import Profile from './pages/Profile';
import Terms from './pages/Terms'
import Privacy from './pages/Privacy';

export default function App() {
  return (
    <div className="app-container">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/share" element={<Share />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/complete-account" element={<CompleteAccount />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />

        <Route path="/story/:id" element={<ReadStory />} />
      </Routes>
    </div>
  );
}
