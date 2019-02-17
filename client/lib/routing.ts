import { ServerResponse } from 'http';
import Router from 'next/router';

// https://medium.com/@positivecarlos/authentication-on-universal-react-with-next-js-b441ef458046
export const redirect = (target: string, res: ServerResponse) => {
  if (res) {
    res.writeHead(303, { Location: target });
    res.end();
  } else {
    Router.replace(target);
  }
};
