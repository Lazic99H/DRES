import React from 'react';
import Button from './Button'
import "../styling/WelcomePage.css"
function WelcomePage() {
  return (
    <div className='hero-container'>
        <video src="./videos/video-2.mp4" autoPlay loop muted/>
        <div className="welcome-page-h1">Want to send money in the blink of an eye</div>
        <div className="welcome-page-p">What are you waiting for?</div>
        <div className="hero-btns">
            <Button
                className='btns'
                buttonStyle='btn--outline'
                buttonStyle='btn--large'
            >
                JOIN US
            </Button>
        </div>
    </div>
  );
}

export default WelcomePage;