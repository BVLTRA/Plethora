import React from 'react';
import './Hero.css';
import { WovenLightHero } from '../components/ui/woven-light-hero';

export default function HeroSection() {
  return (
    <section className="hero-container">
      
      {/* Layer 1: Canvas, constrained to the right */}
      <div className="hero-canvas-wrapper">
        <WovenLightHero />
      </div>

      {/* Layer 2: Text, overlapping on the left */}
      <div className="hero-content">
        <div className="hero-text-block">
          <h2 className="hero-subtitle">Plethora Diary</h2>
          <h1 className="hero-title">Speak into the void. It is listening.</h1>
          <p className="hero-description">
            We weren't built to carry it all alone. Plethora is a public, uncurated stream of human weight. No profiles. No search bar. Just the raw signal of what people are dealing with right now.
          </p>
          <div className="hero-actions">
            <button className="btn-outline">Learn more</button>
            <button className="btn-solid">Release</button>
          </div>
        </div>
      </div>
      
    </section>
  );
}