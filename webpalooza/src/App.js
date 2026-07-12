import './App.css';
import Logo from './assets/logo.png';
import { useEffect, useState } from 'react';

function App() {
  const loadingPhrases = [
    'Loading…',
    'Searching…',
    'Almost there…',
  ];

  const [showLoadingText, setShowLoadingText] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    let phraseTimer;

    const startTimer = setTimeout(() => {
      setShowLoadingText(true);
      phraseTimer = setInterval(() => {
        setPhraseIndex((prev) => (prev + 1) % loadingPhrases.length);
      }, 1700);
    }, 1200);

    return () => {
      clearTimeout(startTimer);
      if (phraseTimer) {
        clearInterval(phraseTimer);
      }
    };
  }, [loadingPhrases.length]);

  return (
    <header className="App-header">
    <div className="logo-title">
      <img className="logo" src={Logo} alt="logo" />
      <p className="title-text">WISH LIST</p>
      {showLoadingText && (
        <p key={phraseIndex} className="loading-text">{loadingPhrases[phraseIndex]}</p>
      )}
      
    </div>
    </header>
  );
}

export default App;
