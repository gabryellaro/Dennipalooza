import './App.css';
import Logo from './assets/logo.png';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  return (
    <header className="App-header">
    <div className="logo-title">
      <img className="logo" src={Logo} alt="Dennipalooza logo" />
      <button className="wish-list-button" onClick={() => navigate('/loading')}>
        WISH LIST
      </button>
    </div>
    </header>
  );
}

export default App;
