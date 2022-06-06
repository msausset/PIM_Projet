import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import CardComments from "./CardComments";
import LikeButton from "./LikeButton";

const Card = ({ restaurant }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const usersData = useSelector((state) => state.usersReducer);
  // const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={restaurant._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img src={restaurant.picture} alt="" />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>{restaurant.name}</h3>
              </div>
              <p>
                {restaurant.adress} - {restaurant.location}
              </p>
            </div>
            <p>{restaurant.description}</p>
            <div className="card-footer">
              <div className="comment-icon">
                <img
                  onClick={() => setShowComments(!showComments)}
                  src="./img/icons/message1.svg"
                  alt="comment"
                />
                <span>{restaurant.comments.length}</span>
              </div>
              <LikeButton restaurant={restaurant} />
              <img src="./img/icons/share.svg" alt="share" />
            </div>
            {showComments && <CardComments restaurant={restaurant} />}
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
