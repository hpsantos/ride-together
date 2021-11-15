import Container from "react-bootstrap/container"
import Header from "@components/Header"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container>
        {children}
      </Container>
    </>
  )
}

export default Layout
