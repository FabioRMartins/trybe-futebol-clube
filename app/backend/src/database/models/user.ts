import { Model, DataTypes } from 'sequelize';
import db from '.';

class User extends Model {
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  role: DataTypes.STRING,
}, {
  sequelize: db,
  timestamps: false,
  modelName: 'users',
  underscored: true,
});

export default User;
