const mongoose = require("mongoose");

// Modèle d'un restaurant

const RestaurantSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    adress: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: [String],
    },
    phone: {
      type: String,
    },
    options: {
      type: [String],
    },
    typeRestaurant: {
      type: String,
    },
    picture: {
      type: String,
    },
    likers: {
      type: [String],
      required: true,
    },
    comments: {
      type: [
        {
          commenterId: String,
          commenterPseudo: String,
          text: String,
          timestamp: Number,
        },
      ],
      required: true,
    },
    dishes: {
      type: [
        {
          name: String,
          options: [String],
          prix: String,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("restaurant", RestaurantSchema);
