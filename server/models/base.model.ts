import { Model } from 'objection';

export default abstract class BaseModel extends Model {
  created_at?: string;

  updated_at?: string;

  $beforeInsert() {
    this.created_at = new Date().toISOString();
    this.updated_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}
