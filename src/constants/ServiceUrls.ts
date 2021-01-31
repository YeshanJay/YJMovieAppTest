
import { envConfig } from "../../env";

export class ServiceUrls {

    /**
     * Base URL
     */
    static get API_BASE_URL() {
        return envConfig.API_TMDB_URL;
    }


    /**
     * FORMAT:
     * 
     * GET: `/configuration`
     */
    static get API_TMDB_GET_CONFIG() {
        return `${ServiceUrls.API_BASE_URL}/configuration`;
    }

    /**
     * FORMAT:
     * 
     * GET: `/discover/movie`
     */
    static get API_TMDB_DISCOVER_MOVIES() {
        return `${ServiceUrls.API_BASE_URL}/discover/movie`;
    }

    /**
     * FORMAT:
     * 
     * GET: `/discover/movie`
     */
    static get API_TMDB_DISCOVER_TV_SERIES() {
        return `${ServiceUrls.API_BASE_URL}/discover/tv`;
    }

    /**
     * FORMAT:
     * 
     * GET: `/search/movie`
     */
    static get API_TMDB_SEARCH_MOVIES() {
        return `${ServiceUrls.API_BASE_URL}/search/movie`;
    }

    /**
     * FORMAT:
     * 
     * GET: `/movie/popular`
     */
    static get API_TMDB_GET_POPULAR_MOVIES() {
        return `${ServiceUrls.API_BASE_URL}/movie/popular`;
    }

    /**
     * FORMAT:
     * 
     * GET: `/tv/popular`
     */
    static get API_TMDB_GET_POPULAR_TV_SERIES() {
        return `${ServiceUrls.API_BASE_URL}/tv/popular`;
    }

    /**
     * FORMAT:
     * 
     * GET: `/movie/{movie_id}`
     */
    static API_TMDB_GET_MOVIE_BY_ID(movieId: number) {
        return `${ServiceUrls.API_BASE_URL}/movie/${movieId}`;
    }


    /**
     * FORMAT:
     * 
     * GET: `/genre/movie/list`
     */
    static get API_TMDB_GET_GENRE_LIST__MOVIE() {
        return `${ServiceUrls.API_BASE_URL}/genre/movie/list`;
    }

    /**
     * FORMAT:
     * 
     * GET: `/genre/tv/list`
     */
    static get API_TMDB_GET_GENRE_LIST__TV() {
        return `${ServiceUrls.API_BASE_URL}/genre/tv/list`;
    }






}