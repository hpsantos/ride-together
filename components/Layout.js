import Head from 'next/head'
import Container from 'react-bootstrap/Container'

import Footer from '~components/Footer'
import Header from '~components/Header'

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Ride Together</title>
        <meta name="description" content="..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="wrapper">
        <Header />
        <Container className="py-5">{children}</Container>
      </main>
      <Footer />
    </>
  )
}

export default Layout
