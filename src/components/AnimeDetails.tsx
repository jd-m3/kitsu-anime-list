import { Anime } from "@models/Anime";
import React from "react";

import {
  StarIcon as StarIconOutline,
  HeartIcon as HeartIconOutline,
  CheckIcon,
} from "@heroicons/react/outline";
import {
  StarIcon as StarIconSolid,
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/solid";

interface Props {
  animeDetails: Anime;
  animeId: string;
  rated: string[];
  liked: string[];
  setRateOrLike: (type: "rated" | "liked", set: boolean) => void;
}

export default function AnimeDetails(props: Props) {
  const { animeDetails, animeId, rated, liked, setRateOrLike } = props;
  return (
    <>
      <img
        className="w-full"
        src={animeDetails.attributes.posterImage.small}
        alt={animeDetails.attributes.canonicalTitle}
      />

      <div className="flex items-center space-x-3">
        {rated.some((r) => r === animeId) ? (
          <StarIconSolid
            onClick={() => {
              setRateOrLike("rated", false);
            }}
            className="h-6 w-6 text-yellow-400 cursor-pointer"
          />
        ) : (
          <StarIconOutline
            onClick={() => {
              setRateOrLike("rated", true);
            }}
            className="h-6 w-6 cursor-pointer"
          />
        )}
        <p>{animeDetails.attributes.averageRating}</p>
      </div>

      <div className="flex items-center space-x-3">
        {liked.some((l) => l === animeId) ? (
          <HeartIconSolid
            onClick={() => {
              setRateOrLike("liked", false);
            }}
            className="h-6 w-6 text-red-600 cursor-pointer"
          />
        ) : (
          <HeartIconOutline
            onClick={() => {
              setRateOrLike("liked", true);
            }}
            className="h-6 w-6 cursor-pointer"
          />
        )}
        <p>Rank #{animeDetails.attributes.ratingRank}</p>
      </div>
      <p>
        Rated {animeDetails.attributes.ageRating}:{" "}
        {animeDetails.attributes.ageRatingGuide}
      </p>
      <p>Aired on {animeDetails.attributes.startDate}</p>
      <p>
        {animeDetails.attributes.endDate
          ? `Ended on ${animeDetails.attributes.endDate}`
          : "Ongoing"}
      </p>
      <p>Type: {animeDetails.attributes.subtype}</p>
    </>
  );
}
