import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "March#1103",
  database: "test",
});

app.get("/", (req, res) => {
  res.send("This backend");
});
app.get("/books", (req, res) => {
  const q = "SELECT * From book";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "SELECT * FROM book WHERE id = ?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0]);
  });
});

app.post("/books", (req, res) => {
  const { tittle, desc, price, cover } = req.body;
  const q = "INSERT INTO book (`tittle`,`desc`,`price`,`cover`) VALUES (?)";
  const values = [tittle, desc, price, cover];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("New Book has been created successfully!");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM book where id = ?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted successfully!");
  });
});
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const { tittle, desc, price, cover } = req.body;
  const q = "UPDATE book SET `tittle` =?, `desc` =?, `price`= ?, `cover` =? WHERE id = ?";
  const values = [tittle, desc, price, cover];
  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been update successfully!");
  });
});

app.listen(8800, () => {
  console.log("Server is running on port 8800");
});
