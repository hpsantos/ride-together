import 'styles/scss/global.scss'

import Layout from 'components/Layout'
import { AuthProvider } from 'context/auth'
import SSRProvider from 'react-bootstrap/SSRProvider'

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </SSRProvider>
  )
}

export default MyApp
