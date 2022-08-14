import React from 'react';

const Loader = () => {
  return (
    <div className={'loader-large'}>
      <div className={'loader-large__inner'}>
        <div className="loader-large__spinner"></div>
      </div>
    </div>
  );
};

export default Loader;