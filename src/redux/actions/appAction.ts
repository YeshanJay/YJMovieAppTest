import { PopularMovieModel } from "../../models/PopularMovieModel";
import { PopularTVSeriesModel } from "../../models/PopularTVSeriesModel";
import { AT_LOAD_FAV_MOVIES, AT_LOAD_FAV_TVSERIES, AT_FAV_MOVIE, AT_UNFAV_MOVIE, AT_FAV_TVSERIES, AT_UNFAV_TVSERIES } from "./types/actionTypes";


export const ac_loadFavouriteMovies = (models: PopularMovieModel[] = []) => {

    return {
        type: AT_LOAD_FAV_MOVIES,
        models
    };
}
export const ac_loadFavouriteTVSeries = (models: PopularTVSeriesModel[] = []) => {

    return {
        type: AT_LOAD_FAV_TVSERIES,
        models
    };
}

export const ac_updateFavMovie = (model: PopularMovieModel, fav: boolean) => {

    return {
        type: (fav ? AT_FAV_MOVIE : AT_UNFAV_MOVIE),
        model
    };
}
export const ac_updateFavTVSeries = (model: PopularTVSeriesModel, fav: boolean) => {

    return {
        type: (fav ? AT_FAV_TVSERIES : AT_UNFAV_TVSERIES),
        model
    };
}
