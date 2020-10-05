
const express = require("express");
const bodyParser = require("body-parser");

// ---------db related imports-----------------
const crud = require("../db_modules/crud");
// ------------------------------------------

const employeeRouter = express.Router();

employeeRouter.use(bodyParser.json());

employeeRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    crud.findDocuments("employee", (doc) => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(doc));
      console.log(doc);
    });
  })
  .post((req, res, next) => {
    crud.insertDocument(
      { name: req.body.name, description: req.body.description },
      "employee",
      (result) => {
        console.log(result.result.n);
        res.statusCode = 201;
        res.end(
          `employee named: ${req.body.name} with details: ${req.body.description} added!`
        );
        console.log(
          `employee named: ${req.body.name} with details: ${req.body.description} added!`
        );
      }
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /employeees");
    console.log("PUT operation not supported on /employeees");
  })
  .delete((req, res, next) => {
    crud.removeAllDocuments("employee", (doc) => {
      //   res.setHeader("Content-Type", "application/json");
      //   res.end(JSON.stringify(doc));
      res.end("All the employees have been deleted!");
      console.log("All the employees have been deleted!");
      console.log(doc);
    });
  });

employeeRouter
  .route("/:id")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    crud.findDocument(req.params.id, "employee", (doc) => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(doc));
      console.log(doc);
    });
    // res.end(`employee with id: ${req.params.id} will be served!`);
    // console.log(`employee with id: ${req.params.id} will be served!`);
  })
  .put((req, res) => {
    crud.updateDocument(
      { name: req.params.id },
      req.body,
      "employee",
      (result) => {
        //   res.setHeader("Content-Type", "application/json");
        //   console.log(result);
        //   res.end(JSON.stringify(result.));
        res.statusCode = 202;
        res.end(`employee with id: ${req.params.id} has been updated!`);
        console.log(`employee with id: ${req.params.id} has been updated!`);
      }
    );
  })
  .delete((req, res, next) => {
    crud.removeDocument({ name: req.params.id }, "employee", (result) => {
      console.log(req.body);
      res.end(`${req.params.id} has been deleted!`);
      console.log(`${req.params.id} has been deleted!`);
    });
  });

module.exports = employeeRouter;
  