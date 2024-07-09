import './global.scss';
import { ClerkProvider } from '@clerk/nextjs';
import React from 'react';

export const metadata = {
  title: 'Roster',
  description: 'Connecting the right people'
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body>
      <div className={'d-flex flex-column vh-100'}>
        {children}
      </div>
      </body>
      </html>
    </ClerkProvider>
  );
}
