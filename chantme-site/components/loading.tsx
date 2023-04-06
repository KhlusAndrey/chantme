import React from 'react';
import '../styles/Home.module.css'

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="spinner"></div>
      <span>Loading...</span>
    </div>
  );
};

export default Loading;


