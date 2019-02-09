import UNSTATED from 'unstated-debug';
import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'unstated';
import getConfig from 'next/config';

const config = getConfig().publicRuntimeConfig;
if (config.env === 'development' && process.browser) {
  UNSTATED.isEnabled = true;
  UNSTATED.logStateChanges = true;
  UNSTATED.isCollapsed = true;
} else {
  UNSTATED.isEnabled = false;
  UNSTATED.logStateChanges = false;
}

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}