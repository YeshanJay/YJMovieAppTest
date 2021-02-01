import { ServiceUrls } from "../../constants/ServiceUrls";
import { PopularTVSeriesModel } from "../../models/PopularTVSeriesModel";
import { Console } from "../../utils/ConsoleLog";
import { APIHelper } from "../APIHelper";
import { PopularTVSeriesDataDTD, DiscoverTVSeriesSearchParams, FetchPopularTVSeriesModelResponseDTD, FetchPopularTVSeriesResponseDTD, DiscoverTVSeriesResponseDTD, DiscoverTVSeriesModelResponseDTD } from "./dtd/TVSeriesTMDB-dtd";


export class TVSeriesService {

    private constructor() { }

    private static convertRawDataListToModels(rawData: PopularTVSeriesDataDTD[]): PopularTVSeriesModel[] {
        const models = [];
        if (rawData && rawData.length) {
            for (let i = 0; i < rawData.length; i++) {
                const rawTV = rawData[i];
                const tvModel = PopularTVSeriesModel.createFromRawData(rawTV);
                models.push(tvModel);
            }
        }

        return models;
    }


    /**
     * Fetch popular TV series (models)
     * 
     * @param page Page number
     */
    static async fetchPopularTVSeriesModels(page: number = 1): Promise<FetchPopularTVSeriesModelResponseDTD> {
        const res: FetchPopularTVSeriesModelResponseDTD = {
            page: 0,
            results: [],
            total_pages: 0,
            total_results: 0
        };

        try {
            const rawRes = await TVSeriesService.fetchPopularTVSeries(page);

            if (rawRes) {
                res.page = rawRes.page;
                res.total_pages = rawRes.total_pages;
                res.total_results = rawRes.total_results;
                res.results = TVSeriesService.convertRawDataListToModels(rawRes.results);
            }

        } catch (e) {
            Console.error(e);
        }

        return res;
    }

    /**
     * Fetch popular TV series
     * 
     * @param page Page number
     */
    private static async fetchPopularTVSeries(page: number = 1): Promise<FetchPopularTVSeriesResponseDTD> {
        try {
            const res = await APIHelper.api.get<FetchPopularTVSeriesResponseDTD>(ServiceUrls.API_TMDB_GET_POPULAR_TV_SERIES);

            if (res.data) {
                return res.data;
            }

        } catch (e) {
            Console.error(e);
        }

        return null;
    }

    /**
     * Discover TV series
     * 
     * @param page Page number
     */
    static async discoverTVSeries(page: number = 1, searchParams: DiscoverTVSeriesSearchParams): Promise<DiscoverTVSeriesModelResponseDTD> {
        const res: DiscoverTVSeriesModelResponseDTD = {
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
            const finalUrl = `${ServiceUrls.API_TMDB_DISCOVER_TV_SERIES}${strParams}`;

            const res2 = await APIHelper.api.get<DiscoverTVSeriesResponseDTD>(finalUrl);
            if (res2.data) {
                const rawRes = res2.data;

                res.page = rawRes.page;
                res.total_pages = rawRes.total_pages;
                res.total_results = rawRes.total_results;
                res.results = TVSeriesService.convertRawDataListToModels(rawRes.results);
            }

        } catch (e) {
            Console.error(e);
        }

        return res;
    }


    static async fetchTVSeriesByIds(ids: number[]): Promise<PopularTVSeriesModel[]> {
        let models: PopularTVSeriesModel[] = [];

        try {
            models = await Promise.all(ids.map((id) => {
                return TVSeriesService.fetchTVSeriesById(id);
            }));
        } catch (error) {
            Console.error(error);
        }

        return models;
    }

    static async fetchTVSeriesById(id: number): Promise<PopularTVSeriesModel> {
        let model: PopularTVSeriesModel = null;

        try {
            const finalUrl = `${ServiceUrls.API_TMDB_GET_MOVIE_BY_ID(id)}`;

            const res = await APIHelper.api.get<PopularTVSeriesDataDTD>(finalUrl);
            if (res.data) {
                const rawData = res.data;
                model = PopularTVSeriesModel.createFromRawData(rawData);
            }

        } catch (error) {
            Console.error(error);
        }

        return model;
    }

}