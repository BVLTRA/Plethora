import React from 'react';
import HeroSection from '../components/Hero'; // Adjust the import path if Hero is in a components folder
import './Home.css';

export default function Home() {
  return (
    <main className="home-wrapper">
      
      <HeroSection />

      <section id="manifesto" className="plethora-info-section">
        <div className="info-max-width">
          
          <div className="info-header">
            <h2 className="info-title">The Architecture of Silence.</h2>
            <p className="info-lead">
              Traditional networks are built on noise. They optimize for algorithms, metrics, and endless engagement loops. Plethora is built for introspection. It is a quiet room.
            </p>
          </div>

          <div className="info-grid">
            
            <div className="info-card">
              <span className="card-number">01.</span>
              <h3>The Concept</h3>
              <p>Plethora strips away the performance of identity. You are represented only by a node and the weight of your words. It is a place to untangle complex thoughts without the pressure of an audience watching you.</p>
            </div>

            <div className="info-card">
              <span className="card-number">02.</span>
              <h3>The Mechanics</h3>
              <p>Write freely in the isolated editor. Save drafts locally to your memory banks, or publish them to the global grid. Acknowledge others silently, or leave a response if you feel compelled to bridge the gap.</p>
            </div>

            <div className="info-card">
              <span className="card-number">03.</span>
              <h3>The Control</h3>
              <p>You own your footprint. Track your history, edit your signals, or execute a complete purge. If you decide to disconnect your node, you can choose whether your stories stay behind as ghosts, or vanish entirely.</p>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}