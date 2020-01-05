const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    charset: 'utf8mb4',
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'web-messenger-1'
});

const DataBase = {};

/**
 * 
 * @param {string} sql SQL query.
 * @param {object} values Prepare values.
 * @param {boolean} isInsert If insert set this.
 * 
 * @returns {object}
 * 
 */

DataBase.query = async (sql, values, isInsert = false) => {
    return new Promise( async (resolve, reject) => {
        try {

            if (isInsert) {
                return pool.query(sql, values, (error, results, fields) => {
                    if (error) return reject(error);
                    resolve({results, fields});
                });
            }

            return pool.query(sql, values, (error, results) => {
                if (error) return reject(error);
                resolve({results});
            });

        } catch(error) {
            console.log(error);
            reject(error);
        }
    });  
}

module.exports = DataBase;