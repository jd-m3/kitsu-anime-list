export type Nullable<T> = T | null;

export type Links = {
  self: "string";
  related: "string";
};

type Titles = {
  en: string;
  en_jp: string;
  ja_jp: string;
};

export type Image = {
  tiny: string;
  small: string;
  medium: string;
  large: string;
  original: string;
  meta: {
    dimensions: {
      tiny: {
        width: Nullable<number>;
        height: Nullable<number>;
      };
      small: {
        width: Nullable<number>;
        height: Nullable<number>;
      };
      medium: {
        width: Nullable<number>;
        height: Nullable<number>;
      };
      large: {
        width: Nullable<number>;
        height: Nullable<number>;
      };
    };
  };
};

export type RelationshipLinks = {
  links: Links;
};

export interface Anime {
  id: string;
  type: string;
  links: Links;
  attributes: {
    createdAt: string;
    updatedAt: string;
    slug: string;
    synopsis: string;
    coverImageTopOffset: number;
    titles: Titles;
    canonicalTitle: string;
    abbreviatedTitles: string[];
    averageRating: number;
    userCount: number;
    favoritesCount: number;
    startDate: string;
    endDate: string;
    popularityRank: number;
    ratingRank: number;
    ageRating: string;
    ageRatingGuide: string;
    subtype: string;
    status: string;
    tba: string;
    posterImage: Image;
    coverImage: Image;
    episodeCount: number;
    episodeLength: number;
    youtubeVideoId: string;
    showType: string;
    nsfw: boolean;
    description: string;
  };
  relationships: {
    animeCharacters: RelationshipLinks;
    animeProductions: RelationshipLinks;
    animeStaff: RelationshipLinks;
    castings: RelationshipLinks;
    categories: RelationshipLinks;
    characters: RelationshipLinks;
    episodes: RelationshipLinks;
    genres: RelationshipLinks;
    installments: RelationshipLinks;
    mappings: RelationshipLinks;
    mediaRelationships: RelationshipLinks;
    productions: RelationshipLinks;
    quotes: RelationshipLinks;
    reviews: RelationshipLinks;
    staff: RelationshipLinks;
    streamingLinks: RelationshipLinks;
  };
}
