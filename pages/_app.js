import '../styles/globals.css'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Toaster />
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
