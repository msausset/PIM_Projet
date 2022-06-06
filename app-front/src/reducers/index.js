import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";
import restaurantReducer from "./restaurant.reducer";

export default combineReducers({
  userReducer,
  usersReducer,
  restaurantReducer,
});
