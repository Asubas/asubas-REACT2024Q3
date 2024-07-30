'use client';

import dynamic from 'next/dynamic';

const App = dynamic(() => import('../../App').then((res) => res.App), { ssr: false });

export function ClientOnly() {
  return <App />;
}
