import React from 'react';
import '../../assets/css/SimpleLoader.css'; // Import the CSS file

const SimpleLoader = () => {
  return (
    <div className="loader">
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
    </div>
  );
};

export default SimpleLoader;
