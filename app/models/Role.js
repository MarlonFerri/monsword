import Model from '../contracts/Model';

export default class Role extends Model {

    modelName = 'Role';

    structure = {
        id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true        
          },
        name: {
            allowNull: false,
            type: DataTypes.STRING
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
