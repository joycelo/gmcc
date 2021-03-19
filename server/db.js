const { Pool } = require('pg');

const pool = new Pool({
  user: 'user1',
  host: 'localhost',
  database: 'gm_database',
  password: 'root',
  port: 5432,
})

const getAllEntries = (req, res, next) => {
  const sqlQuery = `SELECT client, project, project_code, hours, billable_rate FROM timesheet`;
  pool.query(sqlQuery)
    .then((data) => {
      // console.log("data.rows", data.rows);
      res.locals = data.rows;
      return next();
    })
    .catch((err) => err);
}

const createEntry = (req, res, next) => {
  const { date, client, project, project_code, hours, billable, first_name, last_name, billable_rate } = req.body;
  const sqlQuery = 'INSERT INTO timesheet (date, client, project, project_code, hours, billable, first_name, last_name, billable_rate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)'
  const values = [date, client, project, project_code, hours, billable, first_name, last_name, billable_rate];
  pool.query(sqlQuery, values)
    .then((data) => {
      // console.log("data", data);
      // res.locals = data;
      return next();
    })
    .catch((err) => err);
}

module.exports = {
  getAllEntries,
  createEntry,
}