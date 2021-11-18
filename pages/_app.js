import SSRProvider from "react-bootstrap/SSRProvider"
import Layout from "components/Layout"
import "styles/scss/global.scss"

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SSRProvider>
  )
}

export default MyApp
