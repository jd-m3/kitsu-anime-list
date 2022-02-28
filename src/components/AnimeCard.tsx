import { Anime } from "@models/Anime";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  StarIcon as StarIconOutline,
  HeartIcon as HeartIconOutline,
} from "@heroicons/react/outline";
import {
  StarIcon as StarIconSolid,
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/solid";

interface Props {
  anime: Anime;
  onRateClick: (anime: Anime, add: boolean) => void;
  onLikeClick: (anime: Anime, add: boolean) => void;
  rated: string[];
  liked: string[];
}

export default function AnimeCard(props: Props) {
  const { anime, onRateClick, onLikeClick, rated, liked } = props;

  const [rateToggle, setRateToggle] = useState(false);
  const [likeToggle, setLikeToggle] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setRateToggle(rated.some((r) => r === anime.id));
  }, [rated]);

  useEffect(() => {
    setLikeToggle(liked.some((l) => l === anime.id));
  }, [liked]);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg relative cursor-pointer">
      <img
        src={anime.attributes.posterImage.medium}
        className="w-full h-60 lg:h-full object-cover"
        alt={anime.attributes.canonicalTitle}
        onClick={() => {
          router.push(`/${anime.id}`);
        }}
      />
      <div className="absolute w-full py-2.5 bottom-0 inset-x-0 bg-gray-900 opacity-70 hover:opacity-100 text-white text-xs text-center leading-4">
        <p className="text-md font-semibold">
          {anime.attributes.canonicalTitle}
        </p>
        <div className="flex items-center justify-center space-x-8 py-2">
          <div className="flex items-center space-x-2">
            {rateToggle ? (
              <StarIconSolid
                onClick={() => {
                  setRateToggle(!rateToggle);
                  onRateClick(anime, false);
                }}
                className="h-6 w-6 text-yellow-400 cursor-pointer"
              />
            ) : (
              <StarIconOutline
                onClick={() => {
                  setRateToggle(!rateToggle);
                  onRateClick(anime, true);
                }}
                className="h-6 w-6 cursor-pointer"
              />
            )}
            <span>{anime.attributes.averageRating}</span>
          </div>

          <div className="flex items-center space-x-2">
            {likeToggle ? (
              <HeartIconSolid
                onClick={() => {
                  setLikeToggle(!likeToggle);
                  onLikeClick(anime, false);
                }}
                className="h-6 w-6 cursor-pointer text-red-400"
              />
            ) : (
              <HeartIconOutline
                onClick={() => {
                  setLikeToggle(!likeToggle);
                  onLikeClick(anime, true);
                }}
                className="h-6 w-6 cursor-pointer"
              />
            )}
            <span>{!likeToggle ? 0 : 1}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
