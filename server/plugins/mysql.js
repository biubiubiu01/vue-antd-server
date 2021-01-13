const mysql = require('mysql');

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'web_antd',
  multipleStatements: true
});

db.connect();

module.exports = sql => {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};
