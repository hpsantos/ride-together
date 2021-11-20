import { LoginForm } from 'components/user/LoginForm'
import { Card, Col, Row } from 'react-bootstrap'

export default function Login() {
  return (
    <Row className="justify-content-center align-items-center vh-100">
      <Col xs="4">
        <Card>
          <Card.Body>
            <LoginForm />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
