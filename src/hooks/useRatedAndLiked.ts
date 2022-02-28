import React, { useEffect, useState } from "react";

export default function useRatedAndLiked() {
  const [rated, setRated] = useState<string[]>([]);
  const [liked, setLiked] = useState<string[]>([]);

  useEffect(() => {
    const localStorageRated = localStorage.getItem("rated");
    const localStorageLiked = localStorage.getItem("liked");
    if (localStorageRated) {
      setRated(JSON.parse(localStorageRated));
    }
    if (localStorageLiked) {
      setLiked(JSON.parse(localStorageLiked));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("rated", JSON.stringify(rated));
    localStorage.setItem("liked", JSON.stringify(liked));
  }, [rated, liked]);

  return {
    rated,
    liked,
    setRated,
    setLiked,
  };
}
