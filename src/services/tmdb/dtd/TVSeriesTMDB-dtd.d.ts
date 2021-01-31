import { PopularTVSeriesModel } from "../../../models/PopularTVSeriesModel";
import { CommonTMDBResultsResponse } from "./TMDB-dtd";



export type PopularTVSeriesDataDTD = {
    backdrop_path: string;
    /**
     * FORMAT: YYYY-MM-DD
     */
    first_air_date: string;
    genre_ids: number[];
    id: number;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
}

export type FetchPopularTVSeriesResponseDTD = CommonTMDBResultsResponse<PopularTVSeriesDataDTD[]>;
export type FetchPopularTVSeriesModelResponseDTD = CommonTMDBResultsResponse<PopularTVSeriesModel[]>;



export type DiscoverTVSeriesSearchParams = {
    withGenres?: {
        ids: number[];
        op: "AND" | "OR"
    };
    /**
     * Refer for more: https://developers.themoviedb.org/3/discover/tv-discover
     */
    sortBy?: string;
}

export type DiscoverTVSeriesResponseDTD = CommonTMDBResultsResponse<PopularTVSeriesDataDTD[]>;
export type DiscoverTVSeriesModelResponseDTD = CommonTMDBResultsResponse<PopularTVSeriesModel[]>;

