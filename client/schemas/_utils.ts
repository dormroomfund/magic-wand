import { JSONSchema6 } from 'json-schema';
import { uniq } from 'lodash';

/**
 * Takes a schema and produces a new schema consisting only of the specified keys.
 * @see https://github.com/zsolt-dev/json-schema-pick/blob/master/src/index.js
 */
export const pick = (schema: JSONSchema6, keys: string[]) => ({
  ...schema,
  properties: keys.reduce((accumulator, key) => {
    if (typeof schema.properties[key] === 'undefined') return accumulator;
    return {
      ...accumulator,
      [key]: schema.properties[key],
    };
  }, {}),
  required: schema.required.filter((req) => keys.includes(req)),
});

/** Given a schema, makes the specified keys required. */
export const makeRequired = (schema: JSONSchema6, keys: string[]) => ({
  ...schema,
  required: uniq(keys.concat(schema.required)),
});

/** Given a schema, makes all fields optional. */
export const makePartial = (schema: JSONSchema6) => ({
  ...schema,
  required: [],
});
