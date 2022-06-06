import React, { useState, useEffect, useContext } from "react";
import { UidContext } from "../AppContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch } from "react-redux";
import {
  likeRestaurant,
  unlikeRestaurant,
} from "../../actions/restaurant.actions";

const LikeButton = ({ restaurant }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likeRestaurant(restaurant._id, uid));
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unlikeRestaurant(restaurant._id, uid));
    setLiked(false);
  };

  useEffect(() => {
    if (restaurant.likers.includes(uid)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [uid, restaurant.likers, liked]);

  return (
    <div className="like-container">
      {uid === null && (
        <Popup
          trigger={<img src="./img/icons/heart.svg" alt="like" />}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div>Connectez-vous pour aimer un restaurant !</div>
        </Popup>
      )}
      {uid && liked === false && (
        <img src="./img/icons/heart.svg" onClick={like} alt="like" />
      )}
      {uid && liked && (
        <img src="./img/icons/heart-filled.svg" onClick={unlike} alt="unlike" />
      )}
      <span>{restaurant.likers.length}</span>
    </div>
  );
};

export default LikeButton;
