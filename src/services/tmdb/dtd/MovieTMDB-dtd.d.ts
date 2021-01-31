import { PopularMovieModel } from "../../../models/PopularMovieModel"
import { CommonTMDBResultsResponse } from "./TMDB-dtd";



export type PopularMovieDataDTD = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    /**
     * FORMAT: YYYY-MM-DD
     */
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export type FetchPopularMovieResponseDTD = CommonTMDBResultsResponse<PopularMovieDataDTD[]>;
export type FetchPopularMovieModelResponseDTD = CommonTMDBResultsResponse<PopularMovieModel[]>;



export type DiscoverMovieSearchParams = {
    withGenres?: {
        ids: number[];
        op: "AND" | "OR"
    };
    /**
     * Refer for more: https://developers.themoviedb.org/3/discover/movie-discover
     */
    sortBy?: string;
}

export type DiscoverMovieResponseDTD = CommonTMDBResultsResponse<PopularMovieDataDTD[]>;
export type DiscoverMovieModelResponseDTD = CommonTMDBResultsResponse<PopularMovieModel[]>;

export type SearchMovieResponseDTD = CommonTMDBResultsResponse<PopularMovieDataDTD[]>;
export type SearchMovieModelResponseDTD = CommonTMDBResultsResponse<PopularMovieModel[]>;

