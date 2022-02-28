import { CheckIcon } from "@heroicons/react/solid";
import { Episodes } from "@models/Episodes";
import React, { useEffect, useState } from "react";

interface Props {
  episode: Episodes;
  animeId: string;
  onToggle: (ep: Episodes, add: boolean) => void;
  watched: string[];
}

export default function EpisodeList(props: Props) {
  const { episode, onToggle, watched } = props;
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setToggle(watched.some((w) => w === episode.id));
  }, [episode.id, watched]);

  return (
    <>
      <div className="flex items-center space-x-4 w-full">
        {toggle ? (
          <CheckIcon
            onClick={() => {
              onToggle(episode, false);
            }}
            className="h-6 w-6 cursor-pointer text-green-500"
          />
        ) : (
          <CheckIcon
            onClick={() => {
              onToggle(episode, true);
            }}
            className="h-6 w-6 cursor-pointer"
          />
        )}
        <p className="font-semibold w-full lg:w-1/2">
          {episode.attributes.canonicalTitle}
        </p>
        <p className="text-ellipsis w-full hidden lg:block">
          {episode.attributes.synopsis?.substring(0, 120)}...
        </p>
      </div>
      <p className="text-ellipsis w-full block lg:hidden pb-4">
        {episode.attributes.synopsis?.substring(0, 120)}...
      </p>
    </>
  );
}
