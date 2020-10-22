import React, { useState, useEffect, useRef } from "react";
import { Timer, Settings } from "./components";
import alarm from "./assets/Alarm-Fast-High-Pitch-A1-www.fesliyanstudios.com.mp3";

export default function App() {
  const [focusTime, setFocusTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [timeLeft, setTimeLeft] = useState(focusTime);
  const [isFocus, setIsFocus] = useState(true);
  const [intervalToState, setIntervalToState] = useState(null);
  const audioRef = useRef(null);
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    if (isFocus) {
      setTimeLeft(focusTime);
    } else {
      setTimeLeft(breakTime);
    }
  }, [focusTime, breakTime, isFocus]);

  useEffect(() => {
    if (timeLeft === 0) {
      soundOn && audioRef.current.play();
      setIsFocus((prev) => !prev);
    }
  }, [timeLeft, soundOn]);

  const handleStartStop = () => {
    if (!intervalToState) {
      setIntervalToState(
        setInterval(() => {
          setTimeLeft((prev) => prev - 1);
        }, 1)
      );
    } else {
      clearInterval(intervalToState);
      setIntervalToState(null);
    }
  };

  const handleReset = () => {
    clearInterval(intervalToState);
    setIntervalToState(null);
    setIsFocus(true);
    setFocusTime(25 * 60);
    setBreakTime(20 * 60);
    setTimeLeft(focusTime);
  };

  const incrementFocusTime = () => {
    setFocusTime(focusTime + 60);
  };
  const decrementFocusTime = () => {
    if (focusTime > 0) setFocusTime(focusTime - 60);
  };
  const incrementBreakTime = () => {
    setBreakTime(breakTime + 60);
  };
  const decrementBreakTime = () => {
    if (breakTime > 0) setBreakTime(breakTime - 60);
  };

  const handleSoundOn = () => {
    setSoundOn((prev) => !prev);
    audioRef.current.load();
  };

  return (
    <div className="app">
      <h1 className="title">Pomodoro Clock</h1>
      <Timer
        intervalToState={intervalToState}
        isFocus={isFocus}
        timeLeft={timeLeft}
        handleReset={handleReset}
        handleStartStop={handleStartStop}
      />
      <Settings
        breakTime={breakTime}
        focusTime={focusTime}
        decrementBreakTime={decrementBreakTime}
        decrementFocusTime={decrementFocusTime}
        incrementBreakTime={incrementBreakTime}
        incrementFocusTime={incrementFocusTime}
        soundOn={soundOn}
        handleSoundOn={handleSoundOn}
      />
      <audio id="beep" ref={audioRef}>
        <source src={alarm} type="audio/mpeg" />
      </audio>
    </div>
  );
}
