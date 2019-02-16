import { NextContext } from 'next';
import Router from 'next/router';
import { ServerResponse } from 'http';

// https://medium.com/@positivecarlos/authentication-on-universal-react-with-next-js-b441ef458046
export const redirect = (target: string, res: ServerResponse) => {
  if (res) {
    // If on the server, an HTTP 303 response with a "Location"
    // is used to redirect.
    res.writeHead(303, { Location: target });
    res.end();
  } else {
    // On the browser, next/router is used to "replace" the current
    // location for the new one, removing it from history.
    Router.replace(target);
  }
};
