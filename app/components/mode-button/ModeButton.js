'use client';

import { useModeContext } from '@/app/context/ModeContext';
import { useRouter } from 'next/navigation';

export default function ModeButton() {
  const modeContext = useModeContext();
  const { mode } = modeContext;
  const router = useRouter();

  const modeHandler = () => {
    if (mode === 'light') {
      modeContext.darkmodeHandler('dark');
    } else {
      modeContext.lightmodeHandler('light');
    }
    document.cookie = `mode = ${mode} ; max-age=3600`;
    // 쿠키 데이터가 변경된다고 컴포넌트가 리렌더링되지 않기 때문에 refresh를 시켜준다
    router.refresh();
  };
  return (
    <button
      onClick={modeHandler}
      style={{ fontSize: '24px', background: 'inherit', border: 'none', cursor: 'pointer' }}
    >
      {mode === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
