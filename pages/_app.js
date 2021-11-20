import 'styles/scss/global.scss'

import SSRProvider from 'react-bootstrap/SSRProvider'

import Layout from '~components/Layout'
import { AuthProvider } from '~context/auth'

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
