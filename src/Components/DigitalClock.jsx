import React, { useState, useEffect } from 'react';
const DigitalClock = () => {
  const [time, setTime] = useState(new Date());
  const [backgroundColor, setBackgroundColor] = useState(generateRandomColor());
  const [textColor, setTextColor] = useState(generateRandomColor());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const colorChangeInterval = setInterval(() => {
      setBackgroundColor(generateRandomColor());
      setTextColor(generateRandomColor());
    }, 10000);

    return () => clearInterval(colorChangeInterval);
  }, []);

  // Helper function to generate a random color
  function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Create a dynamic style object for the clock text color
  const clockStyle = {
    color: textColor,
    fontSize: '6rem',
  };

  return (
    <div className="digital-clock" style={{ backgroundColor }}>
      <h1 style={clockStyle}>{time.toLocaleTimeString()}</h1>
    </div>
  );
};

export default DigitalClock;
