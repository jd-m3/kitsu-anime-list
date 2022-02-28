import type { Links, Nullable, RelationshipLinks } from "./Anime";

export interface Episodes {
  id: string;
  type: string;
  links: Links;
  attributes: {
    createdAt: string;
    updatedAt: string;
    titles: {
      en_jp: string;
    };
    canonicalTitle: string;
    seasonNumber: number;
    number: number;
    relativeNumber: number;
    synopsis: string;
    airdate: string;
    length: Nullable<number>;
    thumbnail: {
      original: string;
      meta: {
        dimensions: {};
      };
    };
  };
  relationships: {
    media: RelationshipLinks;
    videos: RelationshipLinks;
  };
}
