import NavigationBarBaseLayout from '../../components/NavigationBarBaseLayout';
import { Card, CardBody, CardText, CardTitle, Col, Row } from 'react-bootstrap';
import Link from 'next/link';

import categories from '../../categories.json';

export default function MatchingPage()
{
  // Card component does not work with server components
  return (
    <NavigationBarBaseLayout>
        <Row xs={1} lg={4} className="g-4">
          {
            Object.entries(categories).map(([key, value]) => (
              <Col>
                <Card className={"h-100"}>
                  <CardBody>
                    <div className="py-5 text-center text-primary">
                      <i className={`display-3 ${value.icon}`}/>
                    </div>
                    <CardTitle>{key}</CardTitle>
                    <CardText>{value.description}</CardText>
                    <Link href={`/matching/${value.route}`} className={"btn btn-primary stretched-link"}>
                      Go
                    </Link>
                  </CardBody>
                </Card>
              </Col>
            ))
          }
        </Row>
    </NavigationBarBaseLayout>
  )
}
