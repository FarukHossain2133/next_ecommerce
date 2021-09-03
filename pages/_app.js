import '../styles/globals.css';
import Layout from 'components/layout/index'
import {ToastContainer} from 'react-toastify';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer/>
    </Layout>
  )
}

export default MyApp
