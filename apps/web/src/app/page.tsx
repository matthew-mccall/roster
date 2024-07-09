import Button from 'react-bootstrap/Button';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Card, CardBody, CardText, CardTitle, Col, Row, Stack } from 'react-bootstrap';
import categories from '../categories.json';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <>
      <SignedOut>
        <div className={'text-center'}>
          <h1 className={'fw-semibold display-1'}>Are <span className={'fst-italic'}>you</span> on the <span
            className={'text-primary'}>Roster</span>?</h1>
          <p className={'lead'}>Looking for roommates, partners, and beyond? Join Roster - the hit new app that
            connects
            you with your perfect match! Don&apos;t miss out, join us today.</p>
          <SignInButton>
            <Button variant="primary">Sign In or Sign Up</Button>
          </SignInButton>
        </div>
      </SignedOut>
      <SignedIn>
        <Row xs={1} lg={4} className="g-4">
          {
            Object.entries(categories).map(([key, value]) => (
              <Col key={key}>
                <Card className={'h-100'}>
                  <CardBody>
                    <Stack className={"h-100"}>
                      <div className="py-5 text-center text-primary">
                        <i className={`display-3 ${value.icon}`} />
                      </div>
                      <CardTitle>{key}</CardTitle>
                      <CardText>{value.description}</CardText>
                      <Link href={`/matching/${value.route}`} className={'btn btn-primary mt-auto stretched-link'}>
                        Go
                      </Link>
                    </Stack>
                  </CardBody>
                </Card>
              </Col>
            ))
          }
        </Row>
      </SignedIn>
    </>
  );
}
