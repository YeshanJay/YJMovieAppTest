import { PopularMovieModel } from "../models/PopularMovieModel";
import { PopularTVSeriesModel } from "../models/PopularTVSeriesModel";
import { FavouriteRepo } from "../repositories/FavouriteRepo";
import { Console } from "../utils/ConsoleLog";


export class FavouriteService {

    private constructor() { }


    static updateMovie_FavStatus(model: PopularMovieModel, saved: boolean): Promise<boolean> {
        if (saved) {
            return this.favMovie(model);
        } else {
            return this.unfavMovie(model);
        }
    }
    static updateTVSeries_FavStatus(model: PopularTVSeriesModel, saved: boolean): Promise<boolean> {
        if (saved) {
            return this.favTVSeries(model);
        } else {
            return this.unfavTVSeries(model);
        }
    }

    static async loadAndStore_Favourites(): Promise<void> {
        try {
            FavouriteRepo.initFavourites();
        } catch (error) {
            Console.error(error);
        }
    }


    private static async favMovie(model: PopularMovieModel): Promise<boolean> {
        const prevValue = false;

        try {
            FavouriteRepo.updateFavMovie(model, true);
        } catch (error) {
            Console.error(error);
            FavouriteRepo.updateFavMovie(model, prevValue);
            return false;
        }

        return true;
    }

    private static async unfavMovie(model: PopularMovieModel): Promise<boolean> {
        const prevValue = true;

        try {
            FavouriteRepo.updateFavMovie(model, false);
        } catch (error) {
            Console.error(error);
            FavouriteRepo.updateFavMovie(model, prevValue);
            return false;
        }

        return true;
    }


    private static async favTVSeries(model: PopularTVSeriesModel): Promise<boolean> {
        const prevValue = false;

        try {
            FavouriteRepo.updateFavTVSeries(model, true);
        } catch (error) {
            Console.error(error);
            FavouriteRepo.updateFavTVSeries(model, prevValue);
            return false;
        }

        return true;
    }

    private static async unfavTVSeries(model: PopularTVSeriesModel): Promise<boolean> {
        const prevValue = true;

        try {
            FavouriteRepo.updateFavTVSeries(model, false);
        } catch (error) {
            Console.error(error);
            FavouriteRepo.updateFavTVSeries(model, prevValue);
            return false;
        }

        return true;
    }

}