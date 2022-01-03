import React from 'react';

function WelcomePage() {
  return (
    <div className='hero-container'>
        <video src="/videos/video-2.mp4" autoPlay loop muted/>
        <h1>Want to send money in the blink of an eye</h1>
        <p>What are you waiting for?</p>
        <div className="hero-btns">
            <button>
                JOIN US
            </button>
        </div>
    </div>
  );
}

export default WelcomePage;