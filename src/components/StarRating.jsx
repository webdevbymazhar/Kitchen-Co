// components/StarRating.js
import React from 'react';
import StarRatings from 'react-star-ratings';

const StarRating = ({ rating, onRatingChange }) => {
  return (
    <StarRatings
      rating={rating}
      starRatedColor="gold"
      numberOfStars={5}
      name="rating"
      changeRating={onRatingChange}
      isSelectable={true}
      starDimension="30px"
      starSpacing="5px"
    />
  );
};

export default StarRating;
