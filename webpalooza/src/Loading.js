import * as React from 'react';
import './App.css';

export default function Loading() {
  const { useState, useEffect } = React;
  const loadingPhrases = [
    'Loading',
    'Searching',
    'Almost there',
  ];

  const errorFlashes = [
    '0023 ERROR', '!! NOT FOUND', '0023 ERROR', 'WISH LIST ERROR',
    '0023 ERROR', 'FATAL: 0023', '0023 ERROR', '!! NOT FOUND',
  ];

  const [showLoadingText, setShowLoadingText] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [dotsCount, setDotsCount] = useState(1);
  const [phase, setPhase] = useState('loading');
  const [flashIndex, setFlashIndex] = useState(0);

  useEffect(() => {
    let phraseTimer;
    let dotsTimer;
    let flashTimer;

    const startTimer = setTimeout(() => {
      setShowLoadingText(true);
      setDotsCount(1);
      phraseTimer = setInterval(() => {
        setPhraseIndex((prev) => (prev + 1) % loadingPhrases.length);
      }, 2600);
      dotsTimer = setInterval(() => {
        setDotsCount((prev) => (prev % 3) + 1);
      }, 380);
    }, 2200);

    // Fase 1: ERROR flash rápido (10s)
    const phase1Timer = setTimeout(() => {
      setShowLoadingText(false);
      setPhase('error');
      flashTimer = setInterval(() => {
        setFlashIndex((prev) => prev + 1);
      }, 120);
    }, 10000);

    // Fase 1b: Wish List Not Found. por 2s (12s)
    const phase1bTimer = setTimeout(() => {
      if (flashTimer) clearInterval(flashTimer);
      setPhase('error-found');
    }, 12000);

    // Fase 2: "i just want you" (14s)
    const phase2Timer = setTimeout(() => {
      setPhase('want');
    }, 14000);

    // Fase 3: "See you at DENNIPALOOZA" (21s)
    const phase3Timer = setTimeout(() => {
      setPhase('final');
    }, 21000);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(phase1Timer);
      clearTimeout(phase1bTimer);
      clearTimeout(phase2Timer);
      clearTimeout(phase3Timer);
      if (phraseTimer) clearInterval(phraseTimer);
      if (dotsTimer) clearInterval(dotsTimer);
      if (flashTimer) clearInterval(flashTimer);
    };
  }, [loadingPhrases.length]);

  return (
    <div className="App-header">
      {showLoadingText && (
        <p key={phraseIndex} className="loading-text">
          {loadingPhrases[phraseIndex]}
          <span className="loading-dots">{'.'.repeat(dotsCount)}</span>
        </p>
      )}

      {phase === 'error' && (
        <div className="error-container">
          <div className="error-message">
            <p className="error-code error-flash">{errorFlashes[flashIndex % errorFlashes.length]}</p>
          </div>
        </div>
      )}

      {phase === 'error-found' && (
        <div className="error-container">
          <div className="error-message">
            <p className="error-code">0023 ERROR</p>
            <p className="error-title">Wish List Not Found.</p>
          </div>
        </div>
      )}

      {phase === 'want' && (
        <div className="error-container">
          <div className="error-message">
            <p className="error-subtitle">i just want you.</p>
            <p className="error-secondary">you. that's it</p>
          </div>
        </div>
      )}

      {phase === 'final' && (
        <div className="error-container">
          <div className="error-message">
            <p className="error-final">See you at DENNIPALOOZA.</p>
          </div>
        </div>
      )}
    </div>
  );
}