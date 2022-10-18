const express = require("express");
const req = require("express/lib/request");
const mongoose = require("mongoose");
const todomodel = require("./schema/todos");
const dotenv = require("dotenv");
// const { db } = require("./schema/todos");

const app = express();
app.use(express.json());
dotenv.config();

const port = process.env.PORT || 8080 || 8000;
const db = process.env.DB_LOCAL;

// mongoose.connect('mongodb+sr//admin:1234@cluster0.3zjxv24.mongodb.net/?retryWrites=true&w=majority', {
mongoose
  .connect(db, {
    useNewUrlparser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log(err);
  });
// http method for posting new data to the database
app.post("/list", async (req, res) => {
  // const { title, description, author } = req.body;
  const posting = req.body;

  // const users = await todomodel.create({
  //   title,
  //   description,
  //   author,
  // });
  const users = await todomodel.create(posting);
  if (users) {
    res.status(201).json({
      status: true,
      message: "User was created",
      data: users,
    });
  } else {
    res.status(404).json({
      status: false,
      message: "User was not created",
    });
  }
});

// http method to get or fetch data
app.get("/getAllList", async (req, res) => {
  const data = await todomodel.find();

  if (data) {
    res.status(200).json({
      status: true,
      message: "Data successfully fetched",
      data: data,
    });

    res.send(data);
  } else {
    res.status(400).json({
      status: false,
      message: "sorry something went wrong could not find data",
    });
  }
});

// http method for deleting data by id
app.delete("/takeOut/:id", async (req, res) => {
  const data = await todomodel.findByIdAndDelete(req.params.id);

  if (data) {
    res.status(200).json({
      status: true,
      message: "Data ID successfully deleted ",
      data: data,
    });
  } else {
    res.status(400).json({
      status: false,
      message: "sorry something went wrong could not delete data ID",
    });
  }
});
//  first way to edit http method for patching
// app.patch("/patch/:id", async (req, res) => {
//   const { id } = req.params;
//   const { title, description, author } = req.body;

//   const update = await todomodel
//     .updateOne({
//       title: title,
//       description: description,
//       author: author,
//     })
//     .where({ _id: id });
//   if (update) {
//     res.status(200).json({
//       status: true,
//       message: "Your Info has been successfully updated",
//       data: update,
//     });
//   } else {
//     res.status(400).json({
//       status: false,
//       message: "Something went wrong could not update your info",
//     });
//   }
// });

// Second way to use the http method for patching with less code
app.patch("/patch/:id", async (req, res) => {
  const { id } = req.params;
  const change = req.body;

  const update = await todomodel.updateOne(change).where({ _id: id });
  if (update) {
    res.status(200).json({
      status: true,
      message: "Your Info has been successfully updated",
      data: update,
    });
  } else {
    res.status(400).json({
      status: false,
      message: "Something went wrong could not update your info",
    });
  }
});

// http method to put new information into the database
app.put("/put/:id", async (req, res) => {
  const { id } = req.params;
  const adding = req.body;

  const put = await todomodel.updateOne(adding).where({ _id: id });
  if (put) {
    res.status(200).json({
      status: true,
      message: "Your Info has been successfully updated",
      data: put,
    });
  } else {
    res.status(400).json({
      status: false,
      message: "Something went wrong could not update your info",
    });
  }
});

// Listening to port
app.listen(port, () => {
  console.log("listening to port 5000 successful.....");
});

app.get("/", (req, res) => {
  res.send("listening to port i created");
});
