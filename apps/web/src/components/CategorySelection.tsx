import { Card, CardBody, CardText, CardTitle, Col, Row, Stack } from 'react-bootstrap';
import categories from '../categories.json';
import Link from 'next/link';

export default function CategorySelection() {
  return (
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
  )
}
