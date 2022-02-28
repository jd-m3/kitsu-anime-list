import type { Links, Nullable, RelationshipLinks } from "./Anime";

export interface AnimeCharacters {
  attributes: {
    createdAt: Nullable<string>;
    role: string;
    updatedAt: Nullable<string>;
  };
  id: string;
  links: Links;
  relationships: {
    anime: RelationshipLinks;
    castings: RelationshipLinks;
    character: RelationshipLinks;
  };
  type: string;
}
