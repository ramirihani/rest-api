const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const bodyParser = require("body-parser");
const assert = require("assert");

const app = express();
app.use(bodyParser.json());

const mongo_url = "mongodb://localhost:27017";
const dataBase = "first_api";

MongoClient.connect(mongo_url, { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;
  console.log("db connected ...");

  const db = client.db(dataBase);

  app.post("/add-contact", (req, res) => {
    const newProduct = req.body;
    console.log("newProduct", newProduct);
    db.collection("contact")
      .insertOne(newProduct)
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  });

  app.get("/contact-list", (req, res) => {
    db.collection("contact")
      .find()
      .toArray((err, data) => {
        if (err) {
          res.send("cant fetch contact");
        } else {
          res.send(data);
        }
      });
  });

  app.delete("/delete_contact/:id", (req, res) => {
    let productToRemoveId = req.params.id;
    console.log("productToRemoveId", productToRemoveId);
    db.collection("contact")
      .findOneAndDelete({ _id: ObjectID(productToRemoveId) })
      .then((result) => res.send(result))
      .catch((err) => res.send(err));
  });

  app.get("/getOneContact/:id", (req, res) => {
    const { id } = req.params;
    console.log("id", id);
    db.collection("contact")
      .findOne({ _id: ObjectID(id) })
      .then((contact) => res.send(contact))
      .catch((err) => res.send(err));
  });

  app.put("/update-contact/:id", (req, res) => {
    let id = ObjectID(req.params.id);
    let modifiedProduct = req.body;
    console.log("modifiedProduct", modifiedProduct);
    db.collection("contact")
      .findOneAndUpdate({ _id: id }, { $set: { ...modifiedProduct } })
      .then((result) => res.send(result))
      .catch((err) => console.error(err));
  });
});

app.listen(5000, (err) => {
  if (err) {
    console.log("server err");
  } else {
    console.log("server is running on port 5000");
  }
});
