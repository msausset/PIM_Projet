import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurants } from "../actions/restaurant.actions";
import Card from "./Restaurant/Card";
import { isEmpty } from "./Utils";

const Thread = () => {
  const [loadRestaurant, setLoadRestaurant] = useState(true);
  const [count, setCount] = useState(5);
  const dispatch = useDispatch();
  const restaurants = useSelector((state) => state.restaurantReducer);

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadRestaurant(true);
    }
  };

  useEffect(() => {
    if (loadRestaurant) {
      dispatch(getRestaurants(count));
      setLoadRestaurant(false);
      setCount(count + 5);
    }

    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadRestaurant, dispatch, count]);

  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(restaurants[0]) &&
          restaurants.map((restaurant) => {
            return <Card restaurant={restaurant} key={restaurant._id} />;
          })}
      </ul>
    </div>
  );
};

export default Thread;
