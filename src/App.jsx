import React from 'react';

import './App.css';
import Game from './Game';
import Boxz from './Boxz';
import NameReducer from './NameReducer';

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
