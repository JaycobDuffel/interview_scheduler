import React , { useState } from "react"

export function useVisualMode (initial) {
const [mode, setMode] = useState(initial);

const obj = {
  mode,
  transition
}

function transition (newMode) {
setMode(newMode);
}

return obj;
};