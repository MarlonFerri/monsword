import Model from '../contracts/Model.js';


export default class Task extends Model {
    modelName = 'Task';
    structure = {
        id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true        
          },
        user_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        summary: {
            allowNull: false,
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.DATE,
        }
      }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
}