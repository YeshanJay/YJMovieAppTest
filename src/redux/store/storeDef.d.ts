import { PopularMovieModel } from "../../models/PopularMovieModel";
import { PopularTVSeriesModel } from "../../models/PopularTVSeriesModel";

export interface AppStateDef {
    favMovies: PopularMovieModel[];
    favTVSeries: PopularTVSeriesModel[];
}



export interface ReduxStoreDef {
    app: AppStateDef;
}
