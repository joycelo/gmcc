const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3002;

const db = require('./db');

app.use(cors());

app.use(express.json());

app.get('/timesheet', db.getAllEntries, (req, res) => {
  res.status(200).json(res.locals);
});


// Test example for POST (via ex. Postman): 
// {"date": "2021-05-04", "client": "test-client", "project": "test-project", "project_code": "TEST001", "hours": "5.00", "billable": "yes", "first_name": "Joyce", "last_name": "L", "billable_rate": "50" }

app.post('/timesheet', db.createEntry, (req, res) => {
  // console.log('request body', req.body);
  // console.log('POST res.locals', res.locals);
  res.status(200).json({result: "Success!"});
})

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred.'},
  };

  const errorObj = Object.assign(defaultErr, err);
  res.status(errorObj.status).json(errorObj.message);
})


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

