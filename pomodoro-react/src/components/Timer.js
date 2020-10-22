import React from "react";

export const Timer = ({
  isFocus,
  timeLeft,
  handleStartStop,
  handleReset,
  intervalToState,
}) => {
  const timeLeftToString = (time) => {
    const checkPad = (t) => (t < 10 ? "0" + t : t);
    return `${checkPad(Math.floor(time / 60))}:${checkPad(time % 60)}`;
  };
  return (
    <div className={`timer ${!isFocus && "timer-green"}`}>
      <p className="timer-title">
        {isFocus ? "Focus on work!" : "Take a break!"}
      </p>

      <p className="timer-clock">{timeLeftToString(timeLeft)}</p>
      <div>
        <button onClick={handleStartStop}>
          {intervalToState ? "Stop" : "Start"}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};
