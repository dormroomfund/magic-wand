import BaseModel from './base.model';

export default class User extends BaseModel {
  static get tableName() {
    return 'users';
  }

  // static get jsonSchema() {
  //   return schema.users;
  // }

  static get relationMappings() {
    return {
      associated_companies: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/companies.model`,
        join: {
          from: 'users.id',
          through: {
            from: 'users_companies.user_id',
            to: 'users_companies.company_id',
          },
          to: 'companies.id',
          extra: ['permissions'],
        },
      },
    };
  }
}
