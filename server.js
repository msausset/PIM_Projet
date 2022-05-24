const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const restaurantRoutes = require("./routes/restaurant.routes");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const cors = require("cors");
const app = express();

// Autorisation cors

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

app.use(cors(corsOptions));

// req.params = url / req.body = corps du fichier / req.cookie = accès aux cookies
// Ou express.json() / express.urlencoded ==> Supporter par express nativement maintenant

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// jwt

app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

// routes

app.use("/api/user", userRoutes);
app.use("/api/restaurant", restaurantRoutes);

// serveur

app.listen(process.env.PORT, () => {
  console.log(`Demarré au port ${process.env.PORT}`);
});
