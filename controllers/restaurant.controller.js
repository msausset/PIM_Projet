const restaurantModel = require("../models/restaurant.model");
const RestaurantModel = require("../models/restaurant.model");
const UserModel = require("../models/user.model");
const { uploadErrors } = require("../utils/errors.utils");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

// Récupération de tous les restaus

module.exports.readRestaurant = (req, res) => {
  RestaurantModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Erreur accès données : " + err);
  }).sort({ createdAt: -1 });
};

// Création d'un nouveau restaurant

module.exports.createRestaurant = async (req, res) => {
  let fileName;

  if (req.file !== null) {
    try {
      // Type fichier valide : jpg, png, jpeg
      if (
        req.file.detectedMimeType !== "image/jpg" &&
        req.file.detectedMimeType !== "/image/png" &&
        req.file.detectedMimeType !== "image/jpeg"
      )
        throw Error("invalid file");

      if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }
    fileName = req.body.posterId + Date.now() + ".jpg";

    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../client/public/uploads/restaurants/${fileName}`
      )
    );
  }

  const newRestaurant = new restaurantModel({
    posterId: req.body.posterId,
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
    adress: req.body.adress,
    picture: req.file !== null ? "./uploads/restaurants/" + fileName : "",
    likers: [],
    comments: [],
  });

  try {
    const restaurant = await newRestaurant.save();
    return res.status(201).json(restaurant);
  } catch (err) {
    return err;
  }
};

// Mis à jour d'un restaurant

module.exports.updateRestaurant = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);

  const updatedRecord = {
    description: req.body.description,
    phone: req.body.phone,
    paymentMethod: req.body.paymentMethod,
    location: req.body.location,
    adress: req.body.adress,
    options: req.body.options,
  };

  RestaurantModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Erreur sur la mise à jour : " + err);
    }
  );
};

// Suppression d'un restaurant

module.exports.deleteRestaurant = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);

  RestaurantModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Erreur suppression : " + err);
  });
};

// Like d'un restaurant par un utilisateur

module.exports.likeRestaurant = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);

  try {
    // Ajout dans la table likers les utilisateurs qui ont likés
    await Promise.all([
      RestaurantModel.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { likers: req.body.id } },
        { new: true },
        (err, docs) => {
          if (err) return res.status(400).send(err);
        }
      ),
      // Ajout dans la table likes les restaurants likés
      UserModel.findByIdAndUpdate(
        req.body.id,
        { $addToSet: { likes: req.params.id } },
        { new: true },
        (err, docs) => {
          if (!err) res.send(docs);
          else return res.status(400).send(err);
        }
      ),
    ]);
  } catch (err) {
    return err;
  }
};

// Retirer le like d'un restaurant

module.exports.unlikeRestaurant = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);

  try {
    // Retrait table likers l'id de l'utilisateur qui unlike
    await Promise.all([
      RestaurantModel.findByIdAndUpdate(
        req.params.id,
        { $pull: { likers: req.body.id } },
        { new: true },
        (err, docs) => {
          if (err) return res.status(400).send(err);
        }
      ),
      // Retrait table likes le restaurant à unlike
      UserModel.findByIdAndUpdate(
        req.body.id,
        { $pull: { likes: req.params.id } },
        { new: true },
        (err, docs) => {
          if (!err) res.send(docs);
          else return res.status(400).send(err);
        }
      ),
    ]);
  } catch (err) {
    return err;
  }
};

// Ajouter un commentaire sur un restaurant

module.exports.commentRestaurant = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);

  try {
    return RestaurantModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return err;
  }
};

// Modifier le commentaire sur un restaurant

module.exports.editCommentRestaurant = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);

  try {
    return RestaurantModel.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment) return res.status(404).send("Comment not found");
      theComment.text = req.body.text;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return err;
  }
};

// Supprimer le commentaire sur un restaurant

module.exports.deleteCommentRestaurant = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);

  try {
    return RestaurantModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return err;
  }
};

// Ajouter un plat pour un restaurant

module.exports.dishRestaurant = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);

  try {
    return RestaurantModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          dishes: {
            name: req.body.name,
            prix: req.body.prix,
            options: req.body.options,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return err;
  }
};

// Modifier les informations d'un plat dans un restaurant

module.exports.editDishRestaurant = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);

  try {
    return RestaurantModel.findById(req.params.id, (err, docs) => {
      const theDish = docs.dishes.find((dish) =>
        dish._id.equals(req.body.dishId)
      );

      if (!theDish) return res.status(404).send("Dish not found");
      theDish.name = req.body.name;
      theDish.options = req.body.options;
      theDish.prix = req.body.prix;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return err;
  }
};

// Supprimer un plat dans un restaurant

module.exports.deleteDishRestaurant = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);

  try {
    return RestaurantModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          dishes: {
            _id: req.body.dishId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return err;
  }
};
