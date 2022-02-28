import React, { useEffect, useState } from "react";

export default function useEpisodesWatched() {
  const [watched, setWatched] = useState<string[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("watched");
    if (data) {
      setWatched(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  return { watched, setWatched };
}
