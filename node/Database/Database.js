/* eslint no-console: off */
const mysql = require(`mysql`);

class Database {
  constructor() {
    this.connect = mysql.createConnection({
      host: `213.32.247.201`,
      user: `ADMIN`,
      port: `3306`,
      password: `Admin123!`,
      database: `p2`,
    });
  }

  get(table, choice, queries, objects) {
    return new Promise((resolve, reject) => {
      this.connect.query(`SELECT ${choice} FROM ${table} WHERE ${queries}`, objects,
        (error, result) => {
          if (error) {
            console.log(`Here at node/Database/Database.js-query the error \n${error.code} 
            \nand ${error.stack} should be saved in the Database`);
            reject(error);
          }
          else {
            resolve(result);
          }
        });
    });
  }

  /* Virker ikke endnu */
  post(table, queries, objects) {
    return new Promise((resolve, reject) => {
      this.connect.query(`INSERT INTO ${table}${queries} VALUES ${objects}`,
        (error, result) => {
          if (error) {
            console.log(`Here at node/Database/Database.js-query the error \n${error.code} 
            \nand ${error.stack} should be saved in the Database`);
            reject(error);
          }
          else {
            resolve(result);
          }
        });
    });
  }

  /* Virker ikke endnu */
  put(table, queries, objects) {
    return new Promise((resolve, reject) => {
      this.connect.query(`DOESNT WORK ${table}${queries}${objects}`,
        (error, result) => {
          if (error) {
            console.log(`Here at node/Database/Database.js-query the error \n${error.code} 
            \nand ${error.stack} should be saved in the Database`);
            reject(error);
          }
          else {
            resolve(result);
          }
        });
    });
  }

  /* Virker ikke endnu */
  delete(table, queries, objects) {
    return new Promise((resolve, reject) => {
      this.connect.query(`DOESNT WORK ${table}${queries}${objects}`,
        (error, result) => {
          if (error) {
            console.log(`Here at node/Database/Database.js-query the error \n${error.code} 
            \nand ${error.stack} should be saved in the Database`);
            reject(error);
          }
          else {
            resolve(result);
          }
        });
    });
  }
}


module.exports = {
  Database,
};
