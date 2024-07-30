import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My App',
  description: 'Пока не пон зачем ето',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* <link rel="stylesheet" href="/src/normilize.css" /> */}
        <title>Cute dogs</title>
      </head>
      <body>
        <div id="root">{children}</div>
        {/* <script type="module" src="/src/main.tsx"></script> */}
      </body>
    </html>
  );
}
