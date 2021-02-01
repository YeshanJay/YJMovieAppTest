import { BaseMovieModel } from "../../models/BaseMovieModel";
import { PopularMovieModel } from "../../models/PopularMovieModel";
import { PopularTVSeriesModel } from "../../models/PopularTVSeriesModel";
import { AT_FAV_MOVIE, AT_FAV_TVSERIES, AT_LOAD_FAV_MOVIES, AT_LOAD_FAV_TVSERIES, AT_UNFAV_MOVIE, AT_UNFAV_TVSERIES } from "../actions/types/actionTypes";
import { AppStateDef } from "../store/StoreDef";


const initialState: AppStateDef = {
    favMovies: [],
    favTVSeries: []
};

export const appReducer = (state = initialState, action): AppStateDef => {
    switch (action.type) {

        case AT_LOAD_FAV_MOVIES:
            {
                const favMovies: PopularMovieModel[] = action.models;

                return {
                    ...state,
                    favMovies
                };
            }
        case AT_LOAD_FAV_TVSERIES:
            {
                const favTVSeries: PopularTVSeriesModel[] = action.models;

                return {
                    ...state,
                    favTVSeries
                };
            }

        case AT_FAV_MOVIE:
            {
                const movieModel: PopularMovieModel = action.model;
                const favMovies = state.favMovies;

                let exists = false;
                for (let i = 0; i < favMovies.length; i++) {
                    const data = favMovies[i];

                    if (data.getId() == movieModel.getId()) {
                        exists = true;
                        break;
                    }
                }

                if (exists) {
                    return state;
                } else {
                    favMovies.push(movieModel);

                    return {
                        ...state,
                        favMovies: [
                            ...favMovies
                        ]
                    };
                }
            }
        case AT_UNFAV_MOVIE:
            {
                const movieModel: PopularMovieModel = action.model;
                const favMovies = state.favMovies;


                const indx = favMovies.findIndex((model, index) => {
                    return model.getId() == movieModel.getId();
                });

                if (indx != -1) {
                    favMovies.splice(indx, 1);
                }

                return {
                    ...state,
                    favMovies: [
                        ...favMovies
                    ]
                };
            }

        case AT_FAV_TVSERIES:
            {
                const tvModel: PopularMovieModel = action.model;
                const favTVSeries = state.favMovies;

                let exists = false;
                for (let i = 0; i < favTVSeries.length; i++) {
                    const data = favTVSeries[i];

                    if (data.getId() == tvModel.getId()) {
                        exists = true;
                        break;
                    }
                }

                if (exists) {
                    return state;
                } else {
                    favTVSeries.push(tvModel);

                    return {
                        ...state,
                        favMovies: [
                            ...favTVSeries
                        ]
                    };
                }
            }
        case AT_UNFAV_TVSERIES:
            {
                const movieModel: PopularMovieModel = action.model;
                const favMovies = state.favMovies;


                const indx = favMovies.findIndex((model, index) => {
                    return model.getId() == movieModel.getId();
                });

                if (indx != -1) {
                    favMovies.splice(indx, 1);
                }

                return {
                    ...state,
                    favMovies: [
                        ...favMovies
                    ]
                };
            }

        default:
            return state;
    }
}
