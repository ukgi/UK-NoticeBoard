'use client';

import { useModeContext } from '@/app/context/ModeContext';

export default function CardListLayout({ children }) {
  const modeContext = useModeContext();
  const { mode } = modeContext;

  return (
    <div style={{ height: '100vh', padding: '24px', backgroundColor: mode === 'dark' ? 'black' : 'white' }}>
      {children}
    </div>
  );
}
