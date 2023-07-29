'use client';

const { createContext, useContext, useState } = require('react');

const ModeContext = createContext({
  mode: null,
  darkmodeHandler: function (mode) {},
  lightmodeHandler: function (mode) {},
});

export function ModeContextProvider({ children }) {
  const [mode, setMode] = useState('light');

  function darkmodeHandler(mode) {
    setMode(mode);
  }

  function lightmodeHandler(mode) {
    setMode(mode);
  }

  const context = {
    mode,
    darkmodeHandler,
    lightmodeHandler,
  };

  return <ModeContext.Provider value={context}>{children}</ModeContext.Provider>;
}

export function useModeContext() {
  return useContext(ModeContext);
}
