import React from 'react';

let initialName = 'Esmaeil';

function nameReducer(state, newState) {
  return newState;
}

const NameReducer = () => {
  const [name, setName] = React.useReducer(nameReducer, initialName);
  return (
    <>
      <h1>Learn about useReducer</h1>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <h4>Who is {name}?</h4>
    </>
  );
};

export default NameReducer;
