const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
require("dotenv").config();
const cors = require("cors");

const DATA_PATH = process.env.MONGODB_PATH;
const isProduction = process.env.NODE_ENV === "production";

app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.use(express.json());

const store = new MongoDBStore({
  uri: DATA_PATH,
  collection: "mySessions",
});

app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    },
    store: store,
    resave: false,
    saveUninitialized: false,
  }),
);

const rootdir = require("./utils/pathUtils");
app.use(express.static(path.join(rootdir, "public")));

const authRouter = require("./router/authRouter");
const testRouter = require("./router/testRouter");
app.use("/api/user", authRouter);
app.use("/api/test", testRouter);

const PORT = process.env.PORT || 3004;

mongoose
  .connect(DATA_PATH)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error while connecting to database, ", err);
  });
