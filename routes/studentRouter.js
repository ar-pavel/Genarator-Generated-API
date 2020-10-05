
const express = require("express");
const bodyParser = require("body-parser");

// ---------db related imports-----------------
const crud = require("../db_modules/crud");
// ------------------------------------------

const studentRouter = express.Router();

studentRouter.use(bodyParser.json());

studentRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    crud.findDocuments("student", (doc) => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(doc));
      console.log(doc);
    });
  })
  .post((req, res, next) => {
    crud.insertDocument(
      { name: req.body.name, description: req.body.description },
      "student",
      (result) => {
        console.log(result.result.n);
        res.statusCode = 201;
        res.end(
          `student named: ${req.body.name} with details: ${req.body.description} added!`
        );
        console.log(
          `student named: ${req.body.name} with details: ${req.body.description} added!`
        );
      }
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /studentes");
    console.log("PUT operation not supported on /studentes");
  })
  .delete((req, res, next) => {
    crud.removeAllDocuments("student", (doc) => {
      //   res.setHeader("Content-Type", "application/json");
      //   res.end(JSON.stringify(doc));
      res.end("All the students have been deleted!");
      console.log("All the students have been deleted!");
      console.log(doc);
    });
  });

studentRouter
  .route("/:id")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    crud.findDocument(req.params.id, "student", (doc) => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(doc));
      console.log(doc);
    });
    // res.end(`student with id: ${req.params.id} will be served!`);
    // console.log(`student with id: ${req.params.id} will be served!`);
  })
  .put((req, res) => {
    crud.updateDocument(
      { name: req.params.id },
      req.body,
      "student",
      (result) => {
        //   res.setHeader("Content-Type", "application/json");
        //   console.log(result);
        //   res.end(JSON.stringify(result.));
        res.statusCode = 202;
        res.end(`student with id: ${req.params.id} has been updated!`);
        console.log(`student with id: ${req.params.id} has been updated!`);
      }
    );
  })
  .delete((req, res, next) => {
    crud.removeDocument({ name: req.params.id }, "student", (result) => {
      console.log(req.body);
      res.end(`${req.params.id} has been deleted!`);
      console.log(`${req.params.id} has been deleted!`);
    });
  });

module.exports = studentRouter;
  