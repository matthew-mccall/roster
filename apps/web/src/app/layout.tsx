import './global.scss';
import { ClerkProvider } from '@clerk/nextjs';
import React from 'react';
import NavigationBar from '../components/NavigationBar';
import VerticalCenter from '../components/VerticalCenter';
import Container from 'react-bootstrap/Container';

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
        <NavigationBar />
        <div className={'h-100'}>
          <VerticalCenter>
            <Container>
              {children}
            </Container>
          </VerticalCenter>
        </div>
      </div>
      </body>
      </html>
    </ClerkProvider>
  );
}
