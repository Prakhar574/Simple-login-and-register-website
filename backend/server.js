 const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app=express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"signup"
})
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const sql = 'INSERT INTO login (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred while registering the user' });
    }
    return res.json(result);
  });
});

  app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email, req.body.password], (err, result) => {
      if (err) {
        return res.json("error");
      }
      if (result.length > 0) {
        return res.json("success");
      } else {
        return res.json("failed");
      }
    });
  });

  app.get('/login', (req, res) => {
    db.query('SELECT * FROM login', (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while fetching user details' });
      }
      return res.json(result);
    });
  });
  app.put('/login/:id', (req, res) => {
    const { name, email } = req.body;
    const id = req.params.id;
    const sql = "UPDATE login SET name = ?, email = ? WHERE id = ?";
    db.query(sql, [name, email, id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while updating user details' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.json(result);
    });
  });
  
  app.delete('/login/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM login WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while deleting user details' });
      }
      return res.json(result);
    });
  });

app.listen(8081, ()=>{
    console.log("listening");
})