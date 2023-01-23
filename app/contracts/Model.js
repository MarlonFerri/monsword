import { Model as SequelizeModel } from "sequelize"

/**
 * @abstract
 */
export default class Model extends SequelizeModel {

    /**
     * The name of the model.
     * Should be override on concrete classes.
     * 
     * @var string 
     * @memberof Model
     */
    modelName;

    /**
     * Provide
     *
     * @var object
     * @memberof Model
     */
    structure;
    
    /**
     * @override
     * Init method for Sequelize registration.
     * 
     * @param {Sequelize} sequelize 
     * @returns Model Return the initialized model
     */
    init(sequelize){        
        super.init(this.structure, this.getOptions(sequelize))
    }

    /**
     * Provide default configuration for Model options
     * @param {Sequelize} sequelize 
     * @returns object
     */
    getOptions(sequelize) {
        return {
            sequelize,
            modelName: this.modelName
        }
    }

}