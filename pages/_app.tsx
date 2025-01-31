/* import "../app/globals.css"
import type { AppProps } from "next/app"

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
*/
import "../app/globals.css"
import type { AppProps } from "next/app"
import { LazyMotion, domAnimation } from "framer-motion"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LazyMotion features={domAnimation}>
      <Component {...pageProps} />
    </LazyMotion>
  )
}

