
const express = require("express");
const bodyParser = require("body-parser");

// ---------db related imports-----------------
const crud = require("../db_modules/crud");
// ------------------------------------------

const osRouter = express.Router();

osRouter.use(bodyParser.json());

osRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    crud.findDocuments("os", (doc) => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(doc));
      console.log(doc);
    });
  })
  .post((req, res, next) => {
    crud.insertDocument(
      { name: req.body.name, description: req.body.description },
      "os",
      (result) => {
        console.log(result.result.n);
        res.statusCode = 201;
        res.end(
          `os named: ${req.body.name} with details: ${req.body.description} added!`
        );
        console.log(
          `os named: ${req.body.name} with details: ${req.body.description} added!`
        );
      }
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /oses");
    console.log("PUT operation not supported on /oses");
  })
  .delete((req, res, next) => {
    crud.removeAllDocuments("os", (doc) => {
      //   res.setHeader("Content-Type", "application/json");
      //   res.end(JSON.stringify(doc));
      res.end("All the oss have been deleted!");
      console.log("All the oss have been deleted!");
      console.log(doc);
    });
  });

osRouter
  .route("/:id")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    crud.findDocument(req.params.id, "os", (doc) => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(doc));
      console.log(doc);
    });
    // res.end(`os with id: ${req.params.id} will be served!`);
    // console.log(`os with id: ${req.params.id} will be served!`);
  })
  .put((req, res) => {
    crud.updateDocument(
      { name: req.params.id },
      req.body,
      "os",
      (result) => {
        //   res.setHeader("Content-Type", "application/json");
        //   console.log(result);
        //   res.end(JSON.stringify(result.));
        res.statusCode = 202;
        res.end(`os with id: ${req.params.id} has been updated!`);
        console.log(`os with id: ${req.params.id} has been updated!`);
      }
    );
  })
  .delete((req, res, next) => {
    crud.removeDocument({ name: req.params.id }, "os", (result) => {
      console.log(req.body);
      res.end(`${req.params.id} has been deleted!`);
      console.log(`${req.params.id} has been deleted!`);
    });
  });

module.exports = osRouter;
  