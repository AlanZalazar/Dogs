import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Landing.module.css';

const Landing = () => {
  const [isReady, setIsReady] = useState(false);

  const handleMouseEnter = () => {
    setIsReady(true);
  };

  const handleMouseLeave = () => {
    setIsReady(false);
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Welcome to dogs world...</h1>
      <Link to="/home">
        <button
          className={style.startButton}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isReady ? 'WOOF!' : 'ENTRY'}
        </button>
      </Link>
    </div>
  );
};

export default Landing;
