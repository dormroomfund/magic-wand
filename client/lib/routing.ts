import { NextContext } from 'next';
import Router from 'next/router';

// https://medium.com/@positivecarlos/authentication-on-universal-react-with-next-js-b441ef458046
export const redirect = (target: string, ctx: NextContext) => {
  if (ctx.res) {
    // If on the server, an HTTP 303 response with a "Location"
    // is used to redirect.
    ctx.res.writeHead(303, { Location: target });
    ctx.res.end();
  } else {
    // On the browser, next/router is used to "replace" the current
    // location for the new one, removing it from history.
    Router.replace(target);
  }
};
