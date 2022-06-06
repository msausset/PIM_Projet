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

// {
//   "posterId": "6286979689d25d5a48e9a8f8",
//   "description": "Le meilleur restaurant de poulet au monde !",
//   "name": "KFC",
//   "location": "75001 PARIS",
//   "adress":"25 rue de la Paix",
//   "phone": "01.23.27.96.45",
//   "paymentMethod": ["Carte bancaire", "Espèces", "Tickets restaurant"],
//   "options": ["Vegan", "Végétarien"],
//   "typeRestaurant": "Fast-food",
//   "comments": {
//       "type": [
//           {
//               "commenterId": "6286979689d25d5a48e9a8f8",
//               "commenterPseudo": "Maxime",
//               "text": "Nourriture froide."
//           }
//       ]
//   },
//   "dishes": {
//       "type": [
//          {
//              "name": "Double Krunch Cheese",
//              "prix": "4,95€"
//          }
//       ]
//   }
// }
