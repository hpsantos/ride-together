import Head from 'next/head'
import Container from 'react-bootstrap/Container'

import Header from '~components/Header'

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Ride Together</title>
        <meta name="description" content="..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container className="py-5">{children}</Container>
    </>
  )
}

export default Layout
