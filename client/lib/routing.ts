import { ServerResponse } from 'http';
import Router from 'next/router';
import { getUser } from './authentication';
import { NextContext } from 'next';

// https://medium.com/@positivecarlos/authentication-on-universal-react-with-next-js-b441ef458046
export const redirect = (target: string, res: ServerResponse) => {
  if (res) {
    res.writeHead(303, { Location: target });
    res.end();
  } else {
    Router.replace(target);
  }
};

/**
 * Requires that the user be logged in to see the page.
 * @returns true iff the user is logged in
 */
export const requireLoggedIn = (target: string = '/') => async ({
  req,
  res,
}: NextContext) => {
  const user = await getUser(req);
  if (!user) {
    redirect(target, res);
    return false;
  }

  return true;
};
