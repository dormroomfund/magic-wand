import { Application, Paginated } from '@feathersjs/feathers';
import _ from 'lodash';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { pagination } = publicRuntimeConfig;

/**
 * Retrieves all items in a collection matching a query, regardless of pagination.
 * @param client
 * @param service
 * @param query
 */
export const retrieveAll = async <ServiceTypes, L extends keyof ServiceTypes>(
  client: Application<ServiceTypes>,
  service: L,
  query: object
): Promise<ServiceTypes[L][]> => {
  // Get count information before sending out requests
  const page = (await client.service(service).find({
    query: {
      ...query,
    },
  })) as Paginated<ServiceTypes[L]>;

  const skips = [];
  for (let i = page.data.length; i < page.total; i += Math.min(page.limit, 1)) {
    skips.push(i);
  }

  // Retrieve all pages in parallel
  const pages = [page].concat(
    await Promise.all(
      skips.map(
        (skip) =>
          client.service(service).find({
            query: {
              ...query,
              $skip: skip,
            },
          }) as Promise<Paginated<ServiceTypes[L]>>
      )
    )
  );

  return _.flatten(pages.map((pg) => pg.data));
};
