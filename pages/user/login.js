import { Row, Col, Card } from "react-bootstrap"

import { LoginForm } from "components/user/LoginForm"

export default function Login() {
  return (
    <>
      <Row
        className="justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Col xs="4">
          <Card>
            <Card.Body>
              <LoginForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}
