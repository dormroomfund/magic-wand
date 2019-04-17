import { Model } from 'objection';
import _ from 'lodash';
import dayjs from 'dayjs';

export default abstract class BaseModel extends Model {
  createdAt?: string;

  updatedAt?: string;

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }

  $parseDatabaseJson(json) {
    json = super.$parseDatabaseJson(json);
    const { jsonSchema } = this.constructor as any;

    if (jsonSchema && jsonSchema.properties) {
      Object.entries(jsonSchema.properties).forEach(
        ([prop, schema]: [string, any]) => {
          if (schema.format === 'date') {
            json[prop] = json[prop] && dayjs(json[prop]).format('YYYY-MM-DD');
          }
        }
      );
    }

    return json;
  }
}
