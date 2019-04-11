import App, { Container } from 'next/app';
import getConfig from 'next/config';
import React from 'react';
import { Provider } from 'unstated';
import UNSTATED from 'unstated-debug';
import { authenticate } from '../lib/authentication';
import '../stylesheets/application.scss';
import '../stylesheets/bootstrap.scss';

const config = getConfig().publicRuntimeConfig;

if (config.env === 'development' && process.browser) {
  UNSTATED.isEnabled = true;
  UNSTATED.logStateChanges = true;
  UNSTATED.isCollapsed = true;
} else if (process.browser) {
  UNSTATED.isEnabled = true;
  UNSTATED.logStateChanges = false;
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

  componentDidMount() {
    authenticate();
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
