import { Model, DataTypes } from 'sequelize';
import db from '.';

export default class TeamsModel extends Model {
  id!: number;
  teamName!: string;
}

TeamsModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  teamName: DataTypes.STRING,
}, {
  sequelize: db,
  timestamps: false,
  modelName: 'teams',
  underscored: true,
});
