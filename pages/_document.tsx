import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ECssSelectors } from '@/types/css-selectors'

class MyDocument extends Document {
  render() {
    return (
      <Html data-theme="light">
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id={ECssSelectors.Portal} />
        </body>
      </Html>
    )
  }
}

export default MyDocument
