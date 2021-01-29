import React from 'react';

import './App.css';
import Game from './components/Game';
import Boxz from './components/Boxz';
import NameReducer from './components/NameReducer';

const App = () => {
  return (
    <>
      <Boxz />
      <Game />
      <NameReducer />
    </>
  );
};

export default App;
