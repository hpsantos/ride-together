import Header from 'components/Header'
import Container from 'react-bootstrap/Container'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container className="pt-3">{children}</Container>
    </>
  )
}

export default Layout
