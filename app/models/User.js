import Model from '../contracts/Model.js';

export default class User extends Model {
    modelName = 'User';

    structure = {
        id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true        
        },
        token:{
            type: Sequelize.INTEGER
          },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        role_id: {
            allowNull: false,
            type: DataTypes.INTEGER        
        }
      };
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
}