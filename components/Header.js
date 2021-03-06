import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Container, Nav, Navbar } from 'react-bootstrap'

import { useAuth } from '~context/auth'
import { getFullName } from '~lib/utils'

const Header = () => {
  const router = useRouter()
  const { user, setUser } = useAuth()

  const getActiveClass = (pathname) => {
    return router.pathname === pathname ? 'active' : ''
  }

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand href="/">
            <Image
              src="/assets/logo.png"
              width="20"
              height="20"
              alt="RideTogether logo"
            />
            &nbsp;Ride<strong>Together</strong>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && (
              <Link href="/user/routes" passHref>
                <Nav.Link
                  href="/user/routes"
                  active={getActiveClass('/user/routes')}
                >
                  My Routes
                </Nav.Link>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>

        {user && (
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as <strong>{getFullName(user.name)}</strong>
            </Navbar.Text>
            <Nav className="ml-3">
              <Nav.Link
                onClick={() => setUser(null)}
                className="text-danger"
                active={getActiveClass('/logout')}
              >
                <strong>
                  <i className="bi-door-open"></i>
                </strong>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}

        {!user && (
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Link href="/user/login" passHref>
                <Nav.Link
                  href="/user/login"
                  active={getActiveClass('/user/login')}
                >
                  <i className="bi-door-closed" />
                  &nbsp; Login
                </Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  )
}

export default Header
