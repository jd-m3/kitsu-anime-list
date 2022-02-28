import { Anime } from "@models/Anime";
import { Episodes } from "@models/Episodes";
import axios, { AxiosResponse } from "axios";

export interface KitsuApiResponse<T> {
  data: T;
  links: {
    first: string;
    last: string;
    next: string;
  };
  meta: {
    count: number;
  };
}

const kitsuApiEndpoint =
  process.env.NEXT_PUBLIC_KITSU_API_ENDPOINT ?? "https://kitsu.io/api/edge";

export const getAnimeList = (
  filter?: string
): Promise<AxiosResponse<KitsuApiResponse<Anime[]>>> => {
  return axios.get(`${kitsuApiEndpoint}/anime?${filter ? filter : ""}`);
};

export const getAnimeById = (
  id: string,
  filter?: string
): Promise<AxiosResponse<KitsuApiResponse<Anime>>> => {
  return axios.get(`${kitsuApiEndpoint}/anime/${id}?${filter ? filter : ""}`);
};

export const getAnimeEpisodesById = (
  id: string,
  filter?: string
): Promise<AxiosResponse<KitsuApiResponse<Episodes[]>>> => {
  return axios.get(
    `${kitsuApiEndpoint}/anime/${id}/episodes?${filter ? filter : ""}`
  );
};
