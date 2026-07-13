import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Loading from './Loading';

export default function Rooter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </Router>
  );
}