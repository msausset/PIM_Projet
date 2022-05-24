const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

// Obtenir tous les utilisateurs sans le mdp

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

// Informations Utilisateur

module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID inconnu : " + err);
  }).select("-password");
};

// Mis à jour utilisateur

module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return err;
  }
};

// Supression utilisateur

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Supression réussie." });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// Suivre utilisateurs

module.exports.follow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);

  console.log(req.params.id);
  try {
    await Promise.all([
      // Ajout à la liste des following
      UserModel.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { following: req.body.idToFollow } },
        { new: true, upsert: true },
        (err, docs) => {
          if (!err) res.status(201).json(docs);
          else return res.status(400).jsos(err);
        }
      ),
      // Ajout à la liste des followers
      UserModel.findByIdAndUpdate(
        req.body.idToFollow,
        { $addToSet: { followers: req.params.id } },
        { new: true, upsert: true },
        (err, docs) => {
          /* if (!err) res.status(201).json(docs); */
          if (err) res.status(400).jsos(err);
        }
      ),
    ]);
  } catch (err) {
    return err;
  }
};

// Arrêter de suivre utilisateurs

module.exports.unfollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnfollow)
  )
    return res.status(400).send("ID inconnu : " + req.params.id);

  try {
    await Promise.all([
      // Supression à la liste des following
      UserModel.findByIdAndUpdate(
        req.params.id,
        { $pull: { following: req.body.idToUnfollow } },
        { new: true, upsert: true },
        (err, docs) => {
          if (!err) res.status(201).json(docs);
          else return res.status(400).jsos(err);
        }
      ),
      // Supression à la liste des followers
      UserModel.findByIdAndUpdate(
        req.body.idToUnfollow,
        { $pull: { followers: req.params.id } },
        { new: true, upsert: true },
        (err, docs) => {
          /* if (!err) res.status(201).json(docs); */
          if (err) res.status(400).jsos(err);
        }
      ),
    ]);
  } catch (err) {
    return err;
  }
};
