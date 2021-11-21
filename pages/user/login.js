import { Card, Col, Row } from 'react-bootstrap'

import { LoginForm } from '~components/user/LoginForm'

export default function Login() {
  return (
    <Row className="justify-content-center align-items-center">
      <Col xs="4">
        <div className="text-center mb-5">
          <div>
            <h2>
              Ride<strong>Together</strong>
            </h2>

            <p className="lead text-muted">Please enter your credentials</p>
          </div>
        </div>

        <Card>
          <Card.Body>
            <LoginForm />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
