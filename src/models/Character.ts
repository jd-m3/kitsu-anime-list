import { Image, Links, Nullable, RelationshipLinks } from "./Anime";

type Names = { en: string; ja_jp: string };

export interface Character {
  attributes: {
    canonicalName: string;
    createdAt: string;
    description: string;
    image: Image;
    malId: number;
    name: string;
    names: Names;
    otherNames: string[];
    slug: string;
    updatedAt: string;
  };
  id: string;
  links: Links;
  relationships: {
    castings: RelationshipLinks;
    mediaCharacters: RelationshipLinks;
    primaryMedia: RelationshipLinks;
    quotes: RelationshipLinks;
  };
  type: string;
}
