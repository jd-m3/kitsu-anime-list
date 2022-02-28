import React, { useState } from "react";
import {
  StarIcon as StarIconOutline,
  HeartIcon as HeartIconOutline,
} from "@heroicons/react/outline";
import {
  StarIcon as StarIconSolid,
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/solid";

interface Props {
  onRateClick: (filter: boolean) => void;
  onLikeClick: (filter: boolean) => void;
}

export default function RateAndLikeFilter(props: Props) {
  const { onRateClick, onLikeClick } = props;
  const [rateToggle, setRateToggle] = useState(false);
  const [likeToggle, setLikeToggle] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      {rateToggle ? (
        <StarIconSolid
          onClick={() => {
            onRateClick(false);
            setRateToggle(!rateToggle);
          }}
          className="h-6 w-6 text-yellow-400 cursor-pointer"
        />
      ) : (
        <StarIconOutline
          onClick={() => {
            onRateClick(true);
            setRateToggle(!rateToggle);
          }}
          className="h-6 w-6 cursor-pointer"
        />
      )}

      {likeToggle ? (
        <HeartIconSolid
          onClick={() => {
            onLikeClick(false);
            setLikeToggle(!likeToggle);
          }}
          className="h-6 w-6 cursor-pointer text-red-400"
        />
      ) : (
        <HeartIconOutline
          onClick={() => {
            onLikeClick(true);
            setLikeToggle(!likeToggle);
          }}
          className="h-6 w-6 cursor-pointer"
        />
      )}
    </div>
  );
}
