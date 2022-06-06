import {
  DELETE_COMMENT,
  EDIT_COMMENT,
  GET_RESTAURANTS,
  LIKE_RESTAURANT,
  UNLIKE_RESTAURANT,
} from "../actions/restaurant.actions";

const initialState = {};

export default function restaurantReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RESTAURANTS:
      return action.payload;
    case LIKE_RESTAURANT:
      return state.map((restaurant) => {
        if (restaurant._id === action.payload.restaurantId) {
          return {
            ...restaurant,
            likers: [action.payload.userId, ...restaurant.likers],
          };
        }
        return restaurant;
      });
    case UNLIKE_RESTAURANT:
      return state.map((restaurant) => {
        if (restaurant._id === action.payload.restaurantId) {
          return {
            ...restaurant,
            likers: restaurant.likers.filter(
              (id) => id !== action.payload.userId
            ),
          };
        }
        return restaurant;
      });
    case EDIT_COMMENT:
      return state.map((restaurant) => {
        if (restaurant._id === action.payload.restaurantId) {
          return {
            ...restaurant,
            comments: restaurant.comments.map((comment) => {
              if (comment._id === action.payload.commentId) {
                return {
                  ...comment,
                  text: action.payload.text,
                };
              } else {
                return comment;
              }
            }),
          };
        } else return restaurant;
      });
    case DELETE_COMMENT:
      return state.map((restaurant) => {
        if (restaurant._id === action.payload.restaurantId) {
          return {
            ...restaurant,
            comments: restaurant.comments.filter(
              (comment) => comment._id !== action.payload.commentId
            ),
          };
        } else return restaurant;
      });
    default:
      return state;
  }
}
