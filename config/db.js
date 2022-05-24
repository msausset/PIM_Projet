const mongoose = require("mongoose");

// Connexion BDD

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.DB_USER_PASS +
      "@cluster0.svlza.mongodb.net/MangeonsEnsemble",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connecté à MongoDB"))
  .catch((err) => console.log("Erreur connexion MongoDB", err));
