
import { store as reduxStore } from "../index";
import { PopularMovieModel } from "../models/PopularMovieModel";
import { PopularTVSeriesModel } from "../models/PopularTVSeriesModel";
import { ac_loadFavouriteMovies, ac_loadFavouriteTVSeries, ac_updateFavMovie, ac_updateFavTVSeries } from "../redux/actions/appAction";
import { MovieService } from "../services/tmdb/MovieService";
import { TVSeriesService } from "../services/tmdb/TVSeriesService";
import { FavouriteStorageDTD } from "../storage/dtd/StorageData.dtd";
import { StorageHelper } from "../storage/StorageHelper";
import { STORAGE_KEY_ENUM } from "../storage/StorageKeys.enum";
import { Console } from "../utils/ConsoleLog";

export class FavouriteRepo {

    static async initFavourites(): Promise<void> {
        const savedMap = await StorageHelper.get<FavouriteStorageDTD>(STORAGE_KEY_ENUM.FAV_MOVIES);
        Console.debug("savedMap", savedMap);

        if (savedMap) {
            if (savedMap.movies) {
                PopularMovieModel.favIDs = savedMap.movies;

                const moviesIds: number[] = Object.keys(savedMap.movies).map(Number);

                try {
                    if (moviesIds.length) {
                        const res = await MovieService.fetchMovieByIds(moviesIds);
                        if (res && res.length) {
                            reduxStore.dispatch(ac_loadFavouriteMovies(res));
                        }
                    }
                } catch (error) {
                    Console.error(error);
                }
            }
            if (savedMap.tvSeries) {
                PopularTVSeriesModel.favIDs = savedMap.tvSeries;

                const tvIds: number[] = Object.keys(savedMap.tvSeries).map(Number);

                try {
                    if (tvIds.length) {
                        const res = await TVSeriesService.fetchTVSeriesByIds(tvIds);
                        if (res && res.length) {
                            reduxStore.dispatch(ac_loadFavouriteTVSeries(res));
                        }
                    }
                } catch (error) {
                    Console.error(error);
                }
            }
        }
    }


    static async updateFavMovie(model: PopularMovieModel, saved: boolean): Promise<void> {
        if (saved) {
            PopularMovieModel.favIDs[model.getId()] = true;
        } else {
            delete PopularMovieModel.favIDs[model.getId()];
        }

        reduxStore.dispatch(ac_updateFavMovie(model, saved));
        StorageHelper.save<FavouriteStorageDTD>(STORAGE_KEY_ENUM.FAV_MOVIES, {
            movies: PopularMovieModel.favIDs,
            tvSeries: PopularTVSeriesModel.favIDs
        });
    }

    static async updateFavTVSeries(model: PopularTVSeriesModel, saved: boolean): Promise<void> {
        if (saved) {
            PopularTVSeriesModel.favIDs[model.getId()] = true;
        } else {
            delete PopularTVSeriesModel.favIDs[model.getId()];
        }

        reduxStore.dispatch(ac_updateFavTVSeries(model, saved));
        StorageHelper.save<FavouriteStorageDTD>(STORAGE_KEY_ENUM.FAV_MOVIES, {
            movies: PopularMovieModel.favIDs,
            tvSeries: PopularTVSeriesModel.favIDs
        });
    }
    

}