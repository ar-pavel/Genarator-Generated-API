
const MongoClient = require("mongodb").MongoClient;

const assert = require("assert");

const database = require("../db_modules/db");
const crud = require("../db_modules/crud");

exports.insertDocument = (document, collection, callback) => {
  MongoClient.connect(database.baseUrl, (err, client) => {
    assert.strictEqual(null, err);

    const db = client.db(database.dbname);

    const coll = db.collection(collection);
    coll.insert(document, (err, result) => {
      assert.strictEqual(err, null);

      console.log(
        "Inserted " +
          result.result.n +
          " documents into the collection " +
          collection
      );
      callback(result);
    });

    client.close();
  });
};

exports.findDocuments = (collection, callback) => {
  MongoClient.connect(database.baseUrl, (err, client) => {
    assert.strictEqual(null, err);
    const db = client.db(database.dbname);

    const coll = db.collection(collection);
    coll.find({}).toArray((err, docs) => {
      assert.strictEqual(err, null);
      callback(docs);
    });
    client.close();
  });
};

exports.findDocument = (param, collection, callback) => {
  MongoClient.connect(database.baseUrl, (err, client) => {
    assert.strictEqual(null, err);
    const db = client.db(database.dbname);

    const coll = db.collection(collection);
    coll.find({ name: param }).toArray((err, docs) => {
      assert.strictEqual(err, null);
      callback(docs);
    });
    client.close();
  });
};

exports.removeDocument = (document, collection, callback) => {
  MongoClient.connect(database.baseUrl, (err, client) => {
    assert.strictEqual(null, err);

    const coll = client.db(database.dbname).collection(collection);

    coll.deleteOne(document, (err, result) => {
      assert.strictEqual(err, null);
      console.log("Removed the document ", document);
      callback(result);
    });

    client.close();
  });
};

exports.updateDocument = (document, update, collection, callback) => {
  MongoClient.connect(database.baseUrl, (err, client) => {
    assert.strictEqual(null, err);

    const db = client.db(database.dbname);

    const coll = db.collection(collection);
    coll.updateOne(document, { $set: update }, null, (err, result) => {
      assert.strictEqual(err, null);
      console.log("Updated the document with ", update);
      callback(result);
    });

    client.close();
  });
};

exports.removeAllDocuments = (collection, callback) => {
  MongoClient.connect(database.baseUrl, (err, client) => {
    assert.strictEqual(null, err);

    const db = client.db(database.dbname);

    const coll = db.collection(collection);
    coll.deleteMany({}, (err, result) => {
      assert.strictEqual(err, null);

      callback(result);
    });
    client.close();
  });
};

