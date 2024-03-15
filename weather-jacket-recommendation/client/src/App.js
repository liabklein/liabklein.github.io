import React from 'react';
import './App.css';
import JacketRecommendation from './JacketRecommendation';
import Header from './Header';

function App() {
  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <JacketRecommendation />
      </header>
    </div>
  );
}

export default App;

