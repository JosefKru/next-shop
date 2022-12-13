import '../styles/globals.css'
import NextNProgress from 'nextjs-progressbar'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Toaster />
        <NextNProgress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
