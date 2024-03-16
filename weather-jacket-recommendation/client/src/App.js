import React, { useEffect } from 'react';import './App.css';
import JacketRecommendation from './JacketRecommendation';
import Header from './Header';
import ReactGA from 'react-ga';

const TRACKING_ID = "G-7LB6NCP94J";

function App() {
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

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

