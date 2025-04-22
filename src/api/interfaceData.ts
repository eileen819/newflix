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

export interface IGetMovieDetail {
  adult: boolean;
  genres: IGenre[];
  original_title: string;
  overview: string;
  production_companies?: IProductionCompany[];
  release_date?: string;
  runtime?: number;
  last_episode_to_air?: {
    season_number?: number;
    runtime?: number;
  };
  episode_run_time?: number[];
}

export interface IGenre {
  id: number;
  name: string;
}
export interface IProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
