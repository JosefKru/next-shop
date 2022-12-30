import '../styles/globals.css'
import NextNProgress from 'nextjs-progressbar'
import { Provider } from 'react-redux'
import store, { persistor } from '../redux/store'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import { PersistGate } from 'redux-persist/integration/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const happyNewYear = 2023
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Toaster />
          <NextNProgress
            color='#29D'
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
          />
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
