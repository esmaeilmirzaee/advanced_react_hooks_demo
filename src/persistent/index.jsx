import React, { useState, useEffect } from 'react';

const useLocalStorage = ({ initialValues }) => {
  const [state, setState] = useState(initialValues.state);
  useEffect(() => {
    const storage = localStorage.getItem('tic-toc');

    if (storage == null) {
      localStorage.setItem('tic-toc', state);
    }
  });

  return [state, setState];
};

export default useLocalStorage;
