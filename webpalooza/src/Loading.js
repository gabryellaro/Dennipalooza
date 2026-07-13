import * as React from 'react';
import './App.css';

export default function Loading() {
  const { useState, useEffect } = React;
  const loadingPhrases = [
    'Loading…',
    'Searching…',
    'Almost there…',
  ];

  const [showLoadingText, setShowLoadingText] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'error' | 'want' | 'final'

  useEffect(() => {
    let phraseTimer;

    const startTimer = setTimeout(() => {
      setShowLoadingText(true);
      phraseTimer = setInterval(() => {
        setPhraseIndex((prev) => (prev + 1) % loadingPhrases.length);
      }, 2600);
    }, 2200);

    // Fase 1: Erro (10s depois)
    const phase1Timer = setTimeout(() => {
      setShowLoadingText(false);
      setPhase('error');
    }, 10000);

    // Fase 2: "i just want you" (8s depois)
    const phase2Timer = setTimeout(() => {
      setPhase('want');
    }, 18000);

    // Fase 3: "See you at DENNIPALOOZA" (8s depois)
    const phase3Timer = setTimeout(() => {
      setPhase('final');
    }, 26000);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(phase1Timer);
      clearTimeout(phase2Timer);
      clearTimeout(phase3Timer);
      if (phraseTimer) {
        clearInterval(phraseTimer);
      }
    };
  }, [loadingPhrases.length]);

  return (
    <div className="App-header">
      {showLoadingText && (
        <p key={phraseIndex} className="loading-text">{loadingPhrases[phraseIndex]}</p>
      )}

      {phase === 'error' && (
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