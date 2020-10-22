import React from "react";

export const Settings = ({
  breakTime,
  focusTime,
  decrementBreakTime,
  decrementFocusTime,
  incrementBreakTime,
  incrementFocusTime,
  soundOn,
  handleSoundOn,
}) => {
  return (
    <div>
      <h1 onClick={handleSoundOn} className="settings">
        <span className="sound"> {soundOn ? " 🔈 " : "🔇"}</span>
      </h1>

      <div className="settings">
        <SettingsCard
          label="Focus"
          time={focusTime}
          decrementTime={decrementFocusTime}
          incrementTime={incrementFocusTime}
        />
        <SettingsCard
          label="Break"
          time={breakTime}
          decrementTime={decrementBreakTime}
          incrementTime={incrementBreakTime}
        />
      </div>
    </div>
  );
};

const SettingsCard = ({ label, time, decrementTime, incrementTime }) => (
  <div className="settings-card">
    <p>{label}</p>
    <div className="settings-buttons">
      <button onClick={decrementTime}>{"<"} </button>
      <p>{time / 60}</p>
      <button onClick={incrementTime}>{">"}</button>
    </div>
  </div>
);
