export interface Films{
  title: string;
  year: number;
  genre: string[];
  primaryGenre: string;
  rating: number;
  duration: string;
  description: string;
  fullDescription: string;
  poster: string;
  backdrop: string;
  category: string;
  director: string;
  cast: string[];
  ageRating: string;
  country: string;
  language: string;
  awards: string[];
  streamingPlatforms: StreamingPlatform[];
  budget: string;
  boxOffice: string;
  productionCompany: string;
}

interface StreamingPlatform{
  name: string;
  price: string;
  available: boolean;
  url: string;
}

export interface FilmsWithFavorite extends Films{
  favorite: boolean;
}

export interface getFavorites{
  filmName: string;
  favorite: boolean;
}
