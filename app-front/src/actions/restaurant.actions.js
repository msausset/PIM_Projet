import axios from "axios";

// restaurants

export const GET_RESTAURANTS = "GET_RESTAURANTS";
export const LIKE_RESTAURANT = "LIKE_RESTAURANT";
export const UNLIKE_RESTAURANT = "UNLIKE_RESTAURANT";

// commentaires

export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const getRestaurants = (num) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/api/restaurant`)
      .then((res) => {
        const array = res.data.slice(0, num);
        dispatch({ type: GET_RESTAURANTS, payload: array });
      })
      .catch((err) => console.log(err));
  };
};

export const likeRestaurant = (restaurantId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url:
        `${process.env.REACT_APP_API_URL}/api/restaurant/like-restaurant/` +
        restaurantId,
      data: { id: userId },
    })
      .then((res) => {
        dispatch({ type: LIKE_RESTAURANT, payload: { restaurantId, userId } });
      })
      .catch((err) => console.log(err));
  };
};

export const unlikeRestaurant = (restaurantId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url:
        `${process.env.REACT_APP_API_URL}/api/restaurant/unlike-restaurant/` +
        restaurantId,
      data: { id: userId },
    })
      .then((res) => {
        dispatch({
          type: UNLIKE_RESTAURANT,
          payload: { restaurantId, userId },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const addComment = (
  restaurantId,
  commenterId,
  text,
  commenterPseudo
) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/api/restaurant/comment-restaurant/${restaurantId}`,
      data: { commenterId, text, commenterPseudo },
    })
      .then((res) => {
        dispatch({
          type: ADD_COMMENT,
          payload: { restaurantId },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const editComment = (restaurantId, commentId, text) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/api/restaurant/edit-comment-restaurant/${restaurantId}`,
      data: { commentId, text },
    })
      .then((res) => {
        dispatch({
          type: EDIT_COMMENT,
          payload: { restaurantId, commentId, text },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteComment = (restaurantId, commentId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/api/restaurant/delete-comment-restaurant/${restaurantId}`,
      data: { commentId },
    })
      .then((res) => {
        dispatch({
          type: DELETE_COMMENT,
          payload: { restaurantId, commentId },
        });
      })
      .catch((err) => console.log(err));
  };
};
