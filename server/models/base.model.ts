import { Model } from 'objection';

export default abstract class BaseModel extends Model {
  createdAt?: string;

  udpatedAt?: string;

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.udpatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.udpatedAt = new Date().toISOString();
  }
}
