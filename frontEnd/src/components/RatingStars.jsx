import { useState } from "react";
import { FaStar } from "react-icons/fa";

const RatingStars = ({
  rating = 0,
  editable = false,
  onRate = () => {},
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const displayRating = hoverRating || rating;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={20}
          onClick={() => editable && onRate(star)}
          onMouseEnter={() => editable && setHoverRating(star)}
          onMouseLeave={() => editable && setHoverRating(0)}
          className={`transition-colors duration-200 ${
            star <= displayRating
              ? "text-yellow-400"
              : "text-gray-500"
          } ${
            editable
              ? "cursor-pointer"
              : "cursor-default"
          }`}
        />
      ))}
    </div>
  );
};

export default RatingStars;