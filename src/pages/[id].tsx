import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Anime } from "@models/Anime";
import { getAnimeById, getAnimeEpisodesById, KitsuApiResponse } from "@lib/api";
import axios, { AxiosResponse } from "axios";
import { AnimeCharacters } from "@models/AnimeCharacters";
import { Character } from "@models/Character";
import { Episodes } from "@models/Episodes";

import {
  StarIcon as StarIconOutline,
  HeartIcon as HeartIconOutline,
  CheckIcon,
} from "@heroicons/react/outline";
import {
  StarIcon as StarIconSolid,
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/solid";
import useRatedAndLiked from "@hooks/useRatedAndLiked";
import EpisodeList from "@components/EpisodeList";
import useEpisodesWatched from "@hooks/useEpisodesWatched";
import CharacterCard from "@components/CharacterCard";

export default function SlugPage() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [animeDetails, setAnimeDetails] = useState<Anime | null>(null);
  const [episodes, setEpisodes] = useState<Episodes[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);

  const { rated, liked, setLiked, setRated } = useRatedAndLiked();
  const { watched, setWatched } = useEpisodesWatched();

  useEffect(() => {
    if (!router.isReady) return;
    setId(router.query.id as string);
  }, [router.isReady, router.query.id]);

  useEffect(() => {
    if (id !== "") {
      const fetchData = async () => {
        return await getAnimeById(id);
      };

      fetchData()
        .then((res) => {
          setAnimeDetails(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [id]);

  useEffect(() => {
    if (id !== "") {
      const fetchData = async () => {
        return await getAnimeEpisodesById(id);
      };

      fetchData()
        .then((res) => {
          return setEpisodes(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [id]);

  useEffect(() => {
    if (animeDetails !== null) {
      const fetchCharacters = async (): Promise<
        AxiosResponse<KitsuApiResponse<AnimeCharacters[]>>
      > => {
        const filter = "page[limit]=5";
        return await axios.get(
          `${animeDetails.relationships.animeCharacters.links.related}?${filter}`
        );
      };

      fetchCharacters()
        .then(async (res) => {
          const links = res.data.data.map(
            (chars) => `${chars.links.self}/character`
          );
          axios.all(
            links.map((link) =>
              axios
                .get(link)
                .then((res: AxiosResponse<KitsuApiResponse<Character>>) => {
                  setCharacters((prev) => [...prev, res.data.data]);
                })
                .catch((e) => console.log(e))
            )
          );
        })
        .catch((e) => console.log(e));
    }
  }, [animeDetails]);

  const setEpisodeWatch = (episode: Episodes, add: boolean): void => {
    if (add) {
      setWatched((prev) => {
        const newList = [...prev, episode.id];
        localStorage.setItem("watched", JSON.stringify(newList));
        return newList;
      });
      return;
    }
    setWatched((prev) => {
      const newList = prev.filter((p) => p !== episode.id);
      localStorage.setItem("watched", JSON.stringify(newList));
      return newList;
    });
  };

  const setRateOrLike = (type: "rated" | "liked", set: boolean) => {
    if (type === "rated") {
      if (set) {
        setRated((prev) => [...prev, id]);
      } else {
        setRated((prev) => prev.filter((p) => p !== id));
      }
    }

    if (type === "liked") {
      if (set) {
        setLiked((prev) => [...prev, id]);
      } else {
        setLiked((prev) => prev.filter((p) => p !== id));
      }
    }
  };

  return (
    <div className="container mx-auto py-10 px-10 xl:px-0 w-full">
      {animeDetails !== null && (
        <>
          {/* Header */}
          <div className="flex items-center justify-center w-full">
            <p className="text-2xl font-bold">
              {animeDetails.attributes.canonicalTitle}
            </p>
          </div>

          {/* back button */}
          <div className="py-6">
            <a className="cursor-pointer text-blue-500" href="/">
              &lsaquo; Back
            </a>
          </div>

          <div className="md:flex items-start justify-between w-full md:space-x-8">
            <div className="lg:w-1/3 md:w-1/2 space-y-2 py-2">
              <img
                className="w-full"
                src={animeDetails.attributes.posterImage.small}
                alt={animeDetails.attributes.canonicalTitle}
              />

              <div className="flex items-center space-x-3">
                {rated.some((r) => r === id) ? (
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
                {liked.some((l) => l === id) ? (
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
            </div>

            <div className="w-full">
              <p className="whitespace-pre-line pt-12 md:pt-0">
                {animeDetails.attributes.description}
              </p>

              <div className="block">
                <p className="font-bold text-lg py-4 pt-12">Characters</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-4">
                  {characters.map((char) => (
                    <CharacterCard character={char} key={char.id} />
                  ))}
                </div>

                <p className="font-bold text-lg py-4 pt-12">Episodes</p>
                <div className="pt-4">
                  {episodes.map((ep) => (
                    <EpisodeList
                      onToggle={setEpisodeWatch}
                      key={ep.id}
                      episode={ep}
                      animeId={id}
                      watched={watched}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
