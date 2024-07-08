const express = require('express');
// Import and require Pool (node-postgres)

const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const pool = new Pool(
  {
    user: 'postgres',
    password: 'postgrespass',
    host: 'localhost',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
)

pool.connect();

{ 
  employee_name: "Matthew"
}

app.post('/api/new-employee/', ({ body }, res) => {
  const sql = `INSERT INTO movies (employee_name)
    VALUES ($1)`;
  const params = [body.employee_name];
// Executing a query on the database server that we are connected to already
  pool.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    // at this point there is no error
    res.json({
      message: 'success',
      data: body
    });
  });
});

// Read all 
app.get('/api/names', (req, res) => {
  const sql = `SELECT id, employee_name AS title FROM employee`;

  pool.query(sql, (err, {rows}) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Delete 
app.delete('/api/names/:id', (req, res) => {
  const sql = `DELETE FROM movies WHERE id = $1`;
  const params = [req.params.id];

  pool.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: err.message });
    } else if (!result.rowCount) {
      res.json({
        message: 'Employee not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.rowCount,
        id: req.params.id
      });
    }
  });
});

// Read list of all reviews and associated name using LEFT JOIN
app.get('/api/employee_name', (req, res) => {
  const sql = `SELECT names.employee_name AS name, reviews.review FROM department LEFT JOIN names ON department.employee_id = employee.id ORDER BY employee.employee_name;`;
  pool.query(sql, (err, { rows }) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Update review
app.put('/api/department/:id', (req, res) => {
  const sql = `UPDATE department SET department = $1 WHERE id = $2`;
  const params = [req.body.department, req.params.id];

  pool.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.rowCount) {
      res.json({
        message: 'Review not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.rowCount
      });
    }
  });
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

