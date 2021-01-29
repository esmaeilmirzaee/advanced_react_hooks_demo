import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

let divElement = document.createElement('div');
divElement.className = 'tic';
document.body.append(divElement);

ReactDOM.render(<App />, document.querySelector('.tic'));
