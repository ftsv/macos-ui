import { config } from '@fortawesome/fontawesome-svg-core'
import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '@/styles/globals.css'

config.autoAddCss = false

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

if (!new class { x: unknown }().hasOwnProperty('x')) throw new Error('Transpiler is not configured correctly');

export default function App({ Component, pageProps }: AppProps) {
  return <div className={roboto.className}>
  <Component {...pageProps} />
  </div>
}
