import { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RatingStars = ({
  rating = 0,
  editable = false,
  onRate = () => {},
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const displayRating = hoverRating || rating;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        let Icon = FaRegStar;
        let color = "text-gray-500";

        if (displayRating >= star) {
          Icon = FaStar;
          color = "text-yellow-400";
        } else if (displayRating >= star - 0.5) {
          Icon = FaStarHalfAlt;
          color = "text-yellow-400";
        }

        return (
          <Icon
            key={star}
            size={20}
            onClick={() => editable && onRate(star)}
            onMouseEnter={() => editable && setHoverRating(star)}
            onMouseLeave={() => editable && setHoverRating(0)}
            className={`${color} transition-colors duration-200 ${
              editable ? "cursor-pointer" : "cursor-default"
            }`}
          />
        );
      })}
    </div>
  );
};

export default RatingStars;