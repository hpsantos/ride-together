import Container from 'react-bootstrap/Container'

import Header from '~components/Header'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container className="pt-3">{children}</Container>
    </>
  )
}

export default Layout
