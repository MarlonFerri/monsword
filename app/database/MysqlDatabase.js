import Sequelize from 'sequelize';
import models from '../models/models.js';

export default class MysqlDatabase {

    #sequelize;

    /**
     * Provides a string for Sequelize database parameter
     */
    #database = process.env.MYSQL_DATABASE ?? '';

    /**
     * Provides a string for Sequelize user parameter
     */
    #user = process.env.MYSQL_USER ?? '';

    /**
     * Provides a string for Sequelize password parameter
     */
    #password = process.env.MYSQL_ROOT_PASSWORD ?? '';

    /**
     * Provides a string for Sequelize password parameter
     */
    #host = process.env.MYSQL_HOST ?? 'localhost';

    isConnected = false;

    constructor(
        database = undefined,
        user = undefined,
        password = undefined,
        host = undefined
    ) {
        this.#database = database ?? this.#database;
        this.#user = user ?? this.#user;
        this.#password = password ?? this.#password;
        this.#host = host ?? this.#host;

        this.#sequelize = this.#createSequelize();
        this.#loadModels();        
    }

    /**
     * Create a new instance of Sequelize
     * 
     * @returns Sequelize
     */
    #createSequelize() {
        return new Sequelize(this.#database, this.#user, this.#password, {
            host: this.#host,
            dialect: 'mysql',
            logging: false // this line prevent sequelize to output commands queries on console            
        });        
    }

    /**
     * Close Sequelize connection
     * @returns Promise<void>
     */
    async close() {
        if (this.#sequelize) await this.#sequelize.close();
        this.#sequelize = undefined;
        this.isConnected = false;
    }

    /**
     * Connect to Mysql database using sequelize
     * 
     * @returns Promise<void>
     */
    async connect() {
        //* we use try catch to test authenticate because this method do not have an default exit, or connection exist and work
        //* or it just thrown an erro

        try {
            
            if(!this.isConnected) {
                await this.#sequelize.authenticate();
            }
            this.isConnected = true;
        } catch (error) {
            // Here should came some error handle as a logger.
            // For this test I'm letting just the console of the error
            console.error('Sequelize authenticate fail', error);
        }
    }

    /**
     * Load Models to Sequelize instance
     * 
     * @returns Promise<void>
     */
    async #loadModels() {        

        models.forEach(async (model) => {
            model.init(this.#sequelize);
        });
    }
    
    get sequelize() {
        if(!this.#sequelize)
            this.#sequelize = this.#createSequelize();        
        return this.#sequelize;
    }
}