import { Model } from 'objection';

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
}
