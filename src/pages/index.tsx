import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { getAnimeList } from "@lib/api";
import { Anime } from "@models/Anime";
import { useRouter } from "next/router";

import InfiniteScroll from "react-infinite-scroll-component";
import RateAndLikeFilter from "@components/RateAndLikeFilter";
import AnimeCard from "@components/AnimeCard";
import useRatedAndLiked from "@hooks/useRatedAndLiked";

export default function index() {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [filteredList, setFilteredList] = useState<Anime[]>([]);
  const [nextPage, setNextPage] = useState<string>("");
  const [search, setSearch] = useState("");

  const { rated, liked, setLiked, setRated } = useRatedAndLiked();

  /**
   * Side effect: loads API and populate page
   */
  useEffect(() => {
    const filter = "page[limit]=8";
    fetchData(filter);
  }, []);

  // Updates filtered list
  useEffect(() => {
    setFilteredList(animeList);
  }, [animeList]);

  const fetchData = async (filter?: string) => {
    const fetchAnimeList = async () => {
      return await getAnimeList(filter);
    };

    fetchAnimeList()
      .then((res) => {
        setAnimeList((prev) => [...prev, ...res.data.data]);
        setNextPage(res.data.links.next);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    setSearch(value);
    if (value === "") {
      setFilteredList(animeList);
      return;
    }

    const newList = animeList.filter((a) => {
      return (
        a.attributes.canonicalTitle
          .trim()
          .toLowerCase()
          .search(value.toLowerCase().trim()) !== -1
      );
    });

    setFilteredList(newList);
  };

  const onRateClick = (anime: Anime, add: boolean) => {
    if (add) {
      setRated((prev) => [...prev, anime.id]);
      return;
    }

    setRated((prev) => prev.filter((p) => p !== anime.id));
  };

  const onLikeClick = (anime: Anime, add: boolean) => {
    if (add) {
      setLiked((prev) => [...prev, anime.id]);
      return;
    }

    setLiked((prev) => prev.filter((p) => p !== anime.id));
  };

  const filterRated = (filter: boolean) => {
    if (filter) {
      const newList = filteredList.filter((list) => {
        return rated.some((r) => r === list.id);
      });

      setFilteredList(newList);
      return;
    }

    if (search === "") {
      setFilteredList(animeList);
    } else {
      const newList = animeList.filter((a) => {
        return (
          a.attributes.canonicalTitle
            .trim()
            .toLowerCase()
            .search(search.toLowerCase().trim()) !== -1
        );
      });

      setFilteredList(newList);
    }
  };

  const filterLiked = (filter: boolean) => {
    if (filter) {
      const newList = filteredList.filter((list) => {
        return liked.some((l) => l === list.id);
      });

      setFilteredList(newList);
      return;
    }

    if (search === "") {
      setFilteredList(animeList);
    } else {
      const newList = animeList.filter((a) => {
        return (
          a.attributes.canonicalTitle
            .trim()
            .toLowerCase()
            .search(search.toLowerCase().trim()) !== -1
        );
      });

      setFilteredList(newList);
    }
  };

  return (
    <div className="container mx-auto py-10 px-10 xl:px-0">
      {/* Header */}
      <div className="flex items-center justify-center w-full">
        <p className="text-xl font-bold">Anime List</p>
      </div>

      {/* Filter and search section */}
      <div className="flex items-center w-full py-6 space-x-4">
        <div className="flex items-center space-x-4 md:w-1/4">
          <p className="text-md hidden md:block">Filter</p>
          <RateAndLikeFilter
            onLikeClick={filterLiked}
            onRateClick={filterRated}
          />
        </div>

        <div className="w-full">
          <input
            className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="search"
            type="text"
            placeholder="Search"
            onChange={handleSearch}
          />
        </div>

        <div className="md:w-1/6 lg:w-1/4 text-right hidden md:block">
          {filteredList.length > 0 && <p>{filteredList.length} results</p>}
        </div>
      </div>

      <div className="w-full text-right md:hidden">
        {filteredList.length > 0 && <p>{filteredList.length} results</p>}
      </div>

      {/* Content */}
      <InfiniteScroll
        dataLength={filteredList.length}
        next={() => {
          const [_link, filter] = nextPage.split("?");
          fetchData(filter);
        }}
        hasMore={true}
        loader={<></>}
      >
        <div className="lg:grid-cols-3 xl:grid-cols-4 grid-cols-2 grid h-full gap-4 pt-8">
          {filteredList.map((anime) => (
            <AnimeCard
              onRateClick={onRateClick}
              onLikeClick={onLikeClick}
              key={anime.id}
              anime={anime}
              rated={rated}
              liked={liked}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
