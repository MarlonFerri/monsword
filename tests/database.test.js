import MysqlDatabase from '../app/database/MysqlDatabase.js';
import { describe, it, expect, jest } from '@jest/globals';
import { QueryTypes } from 'sequelize';
import * as dotenv from 'dotenv'
dotenv.config()


const mysqlDatabase = new MysqlDatabase();
await mysqlDatabase.connect();

describe('MySQL Database', () => {
    it('should connect with the database using environment data', async()=>{
        let databases = await mysqlDatabase.sequelize.query('show databases;', {type: QueryTypes.SELECT});
        
        databases = databases.map((database)=>{
            return database.Database;
        });
        expect( databases ).toContain( 'sword' );
    });
});

describe('MySQL Database Tables', () => {
    it('should have project tables', async()=>{
        let tables = await mysqlDatabase.sequelize.query('show tables;', {type: QueryTypes.SELECT});

        tables = tables.map((table)=>{
            return table.Tables_in_sword;
        });
        expect( tables ).toContain( 'roles' );
        expect( tables ).toContain( 'users' );
        expect( tables ).toContain( 'tasks' );
    });
});

// await mysqlDatabase.close();