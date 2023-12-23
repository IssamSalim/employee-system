const express = require("express");
const mongoose = require("mongoose");
const app = express();
const moment = require("moment");
var methodOverride = require("method-override");
app.use(methodOverride("_method"));
const port = 3001;
app.use(express.urlencoded({ extended: true }));
const User = require("./models/customerSchema");
app.set("view engine", "ejs");
app.use(express.static("public"));

// Auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

/////// Get Request
app.get("/", (req, res) => {
  // result  ==> ARRAY OF ABJECT
  console.log("------------------------------------------");
  User.find()
    .then((result) => {
      // console.log(result);
      res.render("index", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/user/add.html", (req, res) => {
  try {
    res.render("user/add");
  } catch {
    (err) => {
      console.log(err);
    };
  }
});

app.get("/edit/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/edit", { item: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/view/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      // console.log(result);
      res.render("user/view", { obj: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});

/////// Post Request

app.post("/user/add.html", (req, res) => {
  // console.log(req.body);
  const user = new User(req.body);
  user
    .save()
    .then(res.redirect("/"))
    .catch((err) => {
      console.log(err);
    });
});

// Delete Request

app.delete("/edit/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => {
      // console.log(result)
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Put Request

// app.put("/edit/:id", (req, res) => {
//   User.findByIdAndUpdate(req.params.id)
//     .then(() => {
//       res.redirect("/");
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ message: "Internal server error" });
//     });
// });

app.put("/edit/:id", (req, res) => {
  console.log(req.body);
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

//Connection code

mongoose
  .connect(
    "mongodb+srv://issam:147258369@cluster0.kdbk3rx.mongodb.net/all-data?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  }) // If all done success use then
  .catch((err) => {
    console.log(err);
  }); // If i have error printe the error and catch it
