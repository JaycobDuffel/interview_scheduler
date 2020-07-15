import { useState } from "react"

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  function transition(newMode, replace = false) {
    if (replace === true) {
      setMode(newMode)
    } else {
      setHistory(prev => [...history, newMode])
      setMode(newMode);
    }
  }

  function back() {
    if (history.length > 1) {
      history.pop()
      setHistory(history)
      setMode(history[history.length - 1])
    }
  }

  return {
    mode,
    transition,
    back
  };
};