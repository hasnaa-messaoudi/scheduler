import { useState } from "react";

export function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (mode, replace = false) => {
    if (!replace){
      setHistory([...history, mode]);
    }
    setMode(mode);

}

  const back = () => {
    if (history.length > 1) {
      history.pop();
    }
    setMode(history[history.length - 1]);
  };

  return {mode, transition, back};
};