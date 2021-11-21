import { Badge, Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
  return (
    <div className="bg-light p-5">
      <Container>
        <Row>
          <Col>
            Ride<strong>Together</strong>
          </Col>
          <Col className="text-end">
            Designed and built with{' '}
            <i className="bi-heart-fill text-danger"></i> for the geekathon
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Footer
