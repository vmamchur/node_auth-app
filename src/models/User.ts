import { Model, DataTypes } from 'sequelize';
import { v4 as uuid } from 'uuid';

import sequelize from '../config/db';

export class User extends Model {
  declare id?: string;
  declare email: string;
  declare encryptedPassword: string;
  declare refreshToken: string;
}

User.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: uuid,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  encryptedPassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refreshToken: {
    type: DataTypes.STRING,
  }
}, { sequelize });
