import Router from "next/router"
import { useState, useEffect } from "react"
import { Form, Button, Alert } from "react-bootstrap"

import { useAuth } from "context/auth"
import { fetchUser } from "services/user"

export const LoginForm = () => {
  const { user, setUser } = useAuth()
  const [username, setUsername] = useState(() => "mquental")
  const [alert, setAlert] = useState(() => null)

  useEffect(() => {
    console.log(user)
    if (user) {
      return Router.push("/user/routes")
    }
  }, [user])

  const loginUser = async (e) => {
    e.preventDefault()

    const answer = await fetchUser(username)

    if (answer.status != 200) {
      setAlert({ variant: "danger", text: "Error logging in" })
    } else {
      setAlert({ variant: "success", text: "Logged in successfully" })
      setUser(answer.data)
    }
  }

  return (
    <Form onSubmit={loginUser} className="p-3">
      {alert && <Alert variant={alert.variant}>{alert.text}</Alert>}

      <Form.Group className="mb-4" controlId="formBasicEmail">
        <Form.Control
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Button variant="primary" type="submit" className="float-end">
        Submit
      </Button>
    </Form>
  )
}
