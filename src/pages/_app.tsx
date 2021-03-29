import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

import React, { useEffect } from 'react'
import ProgressBar from '@badrap/bar-of-progress'
import { Router } from 'next/router'
import { QueryClient, QueryClientProvider } from 'react-query'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

const progress = new ProgressBar({
  size: 2,
  color: '#22D3EE',
  className: 'bar-of-progress',
  delay: 100,
})

if (typeof window !== 'undefined') {
  progress.start()
  progress.finish()
}

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', () => {
  progress.finish()

  // Will not work if scroll is not on <html>
  window.scrollTo(0, 0)
})
Router.events.on('routeChangeError', progress.finish)

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    TimeAgo.addDefaultLocale(en)
  }, [])

  const Layout = (Component as any).layoutProps?.Layout || React.Fragment
  const layoutProps = (Component as any).layoutProps?.Layout
    ? { layoutProps: (Component as any).layoutProps }
    : {}

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Layout {...layoutProps}>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
