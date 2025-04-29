export interface IResult {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title?: string;
  overview: string;
  name?: string;
}
export interface IGetResults {
  dates?: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IResult[];
  total_pages: number;
  total_results: number;
}

export interface ISeasons {
  season_number?: number;
  episode_count?: number;
  name?: string;
  overview?: string;
}

export interface IGenre {
  id: number;
  name: string;
}
export interface IGetMovieDetail {
  adult: boolean;
  genres: IGenre[];
  original_title: string;
  original_name?: string;
  overview: string;
  production_companies?: IProductionCompany[];
  release_date?: string;
  runtime?: number;
  last_episode_to_air?: {
    season_number?: number;
    runtime?: number;
  };
  episode_run_time?: number[];
  backdrop_path?: string;
  poster_path?: string;
  name?: string;
  first_air_date?: string;
  seasons?: ISeasons[];
}

export interface IProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
