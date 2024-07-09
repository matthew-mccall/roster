import { ReactNode } from 'react';
import NavigationBarBase from './NavigationBar/NavigationBarBase';
import VerticalCenter from './VerticalCenter';
import Container from 'react-bootstrap/Container';

export default function NavigationBarBaseLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavigationBarBase />
      <div className={'flex-grow-1'}>
        <VerticalCenter>
          <Container>
            {children}
          </Container>
        </VerticalCenter>
      </div>
    </>
  );
}
