import { ServiceUrls } from "../../constants/ServiceUrls";
import { PopularMovieModel } from "../../models/PopularMovieModel";
import { Console } from "../../utils/ConsoleLog";
import { APIHelper } from "../APIHelper";
import { SearchMovieResponseDTD, SearchMovieModelResponseDTD, DiscoverMovieModelResponseDTD, DiscoverMovieResponseDTD, DiscoverMovieSearchParams, FetchPopularMovieModelResponseDTD, FetchPopularMovieResponseDTD, PopularMovieDataDTD } from "./dtd/MovieTMDB-dtd";


export class MovieService {

    private constructor() { }

    private static convertRawDataListToModels(rawData: PopularMovieDataDTD[]): PopularMovieModel[] {
        const models = [];
        if (rawData && rawData.length) {
            for (let i = 0; i < rawData.length; i++) {
                const rawMovie = rawData[i];
                const movieModel = PopularMovieModel.createFromRawData(rawMovie);
                models.push(movieModel);
            }
        }

        return models;
    }


    /**
     * Fetch popular movies.
     * 
     * @param page Page number
     */
    static async fetchPopularMovieModels(page: number = 1): Promise<FetchPopularMovieModelResponseDTD> {
        const res: FetchPopularMovieModelResponseDTD = {
            page: 0,
            results: [],
            total_pages: 0,
            total_results: 0
        };

        try {
            const res2 = await APIHelper.api.get<FetchPopularMovieResponseDTD>(ServiceUrls.API_TMDB_GET_POPULAR_MOVIES);
            const rawRes = res2.data;
            if (rawRes) {
                res.page = rawRes.page;
                res.total_pages = rawRes.total_pages;
                res.total_results = rawRes.total_results;
                res.results = MovieService.convertRawDataListToModels(rawRes.results);
            }

        } catch (e) {
            Console.error(e);
        }

        return res;
    }

    /**
     * Search movies
     * 
     * @param searchQuery The search query.
     * @param page Page number.
     */
    static async searchMovies(searchQuery: string, page: number = 1): Promise<SearchMovieModelResponseDTD> {
        const res: SearchMovieModelResponseDTD = {
            page: 0,
            results: [],
            total_pages: 0,
            total_results: 0
        };

        try {
            let params = [];
            params.push(`page=${page}`);
            params.push(`query=${encodeURIComponent(searchQuery)}`);

            const strParams = params.length ? `?${params.join("&")}` : "";
            const finalUrl = `${ServiceUrls.API_TMDB_SEARCH_MOVIES}${strParams}`;

            const res2 = await APIHelper.api.get<SearchMovieResponseDTD>(finalUrl);
            if (res2.data) {
                const rawRes = res2.data;

                res.page = rawRes.page;
                res.total_pages = rawRes.total_pages;
                res.total_results = rawRes.total_results;
                res.results = MovieService.convertRawDataListToModels(rawRes.results);
            }

        } catch (e) {
            Console.error(e);
        }

        return res;
    }

    /**
     * Discover movies
     * 
     * @param page Page number
     */
    static async discoverMovies(page: number = 1, searchParams: DiscoverMovieSearchParams): Promise<DiscoverMovieModelResponseDTD> {
        const res: DiscoverMovieModelResponseDTD = {
            page: 0,
            results: [],
            total_pages: 0,
            total_results: 0
        };

        try {
            let params = [];
            params.push(`page=${page}`);

            if (searchParams) {
                if (searchParams.sortBy) {
                    params.push(`sort_by=${searchParams.sortBy}`);
                }
                if (searchParams.withGenres && searchParams.withGenres.ids && searchParams.withGenres.ids.length) {
                    params.push(`with_genres=${searchParams.withGenres.ids.join(searchParams.withGenres.op == "AND" ? "," : "|")}`);
                }
            }


            const strParams = params.length ? `?${params.join("&")}` : "";
            const finalUrl = `${ServiceUrls.API_TMDB_DISCOVER_MOVIES}${strParams}`;

            const res2 = await APIHelper.api.get<DiscoverMovieResponseDTD>(finalUrl);
            if (res2.data) {
                const rawRes = res2.data;

                res.page = rawRes.page;
                res.total_pages = rawRes.total_pages;
                res.total_results = rawRes.total_results;
                res.results = MovieService.convertRawDataListToModels(rawRes.results);
            }

        } catch (e) {
            Console.error(e);
        }

        return res;
    }


    static async fetchMovieByIds(ids: number[]): Promise<PopularMovieModel[]> {
        let models: PopularMovieModel[] = [];

        try {
            models = await Promise.all(ids.map((id) => {
                return MovieService.fetchMovieById(id);
            }));
        } catch (error) {
            Console.error(error);
        }

        return models;
    }

    static async fetchMovieById(id: number): Promise<PopularMovieModel> {
        let model: PopularMovieModel = null;

        try {
            const finalUrl = `${ServiceUrls.API_TMDB_GET_MOVIE_BY_ID(id)}`;

            const res = await APIHelper.api.get<PopularMovieDataDTD>(finalUrl);
            if (res.data) {
                const rawData = res.data;
                model = PopularMovieModel.createFromRawData(rawData);
            }

        } catch (error) {
            Console.error(error);
        }

        return model;
    }

}