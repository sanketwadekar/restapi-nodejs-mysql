const express = require("express");
const db = require("../connection");

const router = express.Router();

//GET all students
router.get("/", (req, res, next) => {
  db.query("SELECT * FROM enroll;", (err, result, fields) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Error in fetching data" });
    } else {
      res.status(200).send(result);
    }
  });
});

//GET student with rollno
router.get("/:rollno", (req, res, next) => {
  let rollno = req.params.rollno;
  db.query(
    `SELECT * FROM enroll WHERE roll_no = ?;`,
    rollno,
    (err, result, fields) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Error in fetching data" });
      } else {
        if (result.length == 0) {
          return res.status(404).send({ message: "Record not found" });
        }
        res.status(200).send(result);
      }
    }
  );
});

//POST a student record in database
router.post("/", (req, res, next) => {
  const { name, rollno, email } = req.body;
  if (!name || !email || !rollno) {
    return res.status(400).send({
      message: "Incomplete body",
    });
  }
  db.query(
    `INSERT INTO enroll VALUES(?,?,?)`,
    [rollno, name, email],
    (err, result, fields) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Error in inserting record" });
      } else {
        res.status(201).send({
          message: "Record inserted",
        });
      }
    }
  );
});

//DELETE a student record from database
router.delete("/:rollno", (req, res, next) => {
  let rollNo = req.params.rollno;
  db.query(
    `DELETE FROM enroll WHERE roll_no = ?`,
    [rollNo],
    (err, result, fields) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Error in deleting record" });
      } else {
        if (result.affectedRows == 0) {
          return res.status(404).send({ message: "Record not found" });
        }
        res.status(200).send({ message: "Record deleted" });
      }
    }
  );
});

//PUT .... update an existing record
router.put("/:rollno", (req, res, next) => {
  const rollNo = req.params.rollno;
  let { name, rollno, email } = req.body;
  db.query(
    `SELECT * FROM enroll WHERE roll_no = ?;`,
    rollNo,
    (err, result, fields) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Error in updating record" });
      } else {
        if (result.length === 0) {
          return res.status(404).send({ message: "Record not found" });
        }
        name = name ? name : result[0].name;
        email = email ? email : result[0].email;
        rollno = rollno ? roll_no : result[0].roll_no;
        db.query(
          `UPDATE enroll SET name = ?, email = ?, roll_no = ? WHERE roll_no = ?`,
          [name, email, rollno, rollNo],
          (err, result, fields) => {
            if (err) {
              console.log(err);
              res.status(500).send({ message: "Error in updating record" });
            } else {
              res.status(200).send({ message: "Record updated" });
            }
          }
        );
      }
    }
  );
});

module.exports = router;
