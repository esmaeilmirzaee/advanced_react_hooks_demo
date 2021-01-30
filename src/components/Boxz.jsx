import React, { useRef, useEffect } from 'react';
import VanillaTilt from 'vanilla-tilt';

const Boxz = () => {
  const tiltRef = useRef();
  useEffect(() => {
    const box = tiltRef.current;
    const VanillaTiltOptions = {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    };
    VanillaTilt.init(box, VanillaTiltOptions);
    return () => box.vanillaTilt.destroy();
  }, []);
  return (
    <>
      <h1>Vanilla Tile</h1>
      <div
        ref={tiltRef}
        style={{
          padding: '100px',
          display: 'flex',
          width: '500px',
          height: '199px',
          backgroundColor: 'rgb(155,25,256)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      ></div>
    </>
  );
};

export default Boxz;
