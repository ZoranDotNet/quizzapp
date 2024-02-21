import React, { useEffect, useState } from "react";

const Timer = ({ timer, setTimer, setStop, questNr }) => {
  useEffect(() => {
    if (timer === 0) {
      return setStop(true);
    } else {
      setStop(false);

      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [setStop, timer]);

  useEffect(() => {
    setTimer(30);
  }, [questNr]);

  return <div>{timer}</div>;
};

export default Timer;
