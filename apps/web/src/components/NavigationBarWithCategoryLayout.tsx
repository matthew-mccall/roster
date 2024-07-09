import { ReactNode } from 'react';
import VerticalCenter from './VerticalCenter';
import Container from 'react-bootstrap/Container';
import NavigationBarWithCategory from './NavigationBar/NavigationBarWithCategory';

export default function NavigationBarWithCategoryLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavigationBarWithCategory />
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
