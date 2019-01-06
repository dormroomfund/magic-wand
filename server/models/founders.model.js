import { Model } from 'objection';

export default class Partner extends Model {
  static get tableName() {
    return 'founders';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['founderID'],

      properties: {
        founderID: { type: 'integer' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        school: { type: 'string' },
        linkedin: { type: 'string' },
        gender: { type: 'string' },
        race: { type: 'string' },
      },
    };
  }
}
