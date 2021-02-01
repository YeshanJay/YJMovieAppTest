import { PopularTVSeriesDataDTD } from "../services/tmdb/dtd/TVSeriesTMDB-dtd";
import { GenreService } from "../services/tmdb/GenreService";
import { IMAGE_SIZE_ENUM, TMImageService } from "../services/tmdb/TMImageService";
import { BaseMovieModel, VID_TYPE_ENUM } from "./BaseMovieModel";


type FavTVSeriesDef = {
    [projectId: number]: boolean;
};

export class PopularTVSeriesModel extends BaseMovieModel {
    static favIDs: FavTVSeriesDef = {};

    private _rawData: PopularTVSeriesDataDTD = null;
    private constructor() {
        super();
    }

    static createFromRawData(rawData: PopularTVSeriesDataDTD): PopularTVSeriesModel {
        const model = new PopularTVSeriesModel();
        model._rawData = rawData;
        return model;
    }


    get title(): string {
        return this._rawData.name;
    }

    get overview(): string {
        return this._rawData.overview;
    }

    get posterImage(): string {
        return TMImageService.getPosterImageUrl(this._rawData.poster_path, IMAGE_SIZE_ENUM.SMALL);
    }

    get backdropImage(): string {
        return TMImageService.getBackdropImageUrl(this._rawData.backdrop_path, IMAGE_SIZE_ENUM.MEDIUM);
    }


    /**
     * @override
     */
    getId(): number {
        return this._rawData.id;
    }

    /**
     * @override
     */
    getTitle(): string {
        return this.title;
    }

    /**
     * @override
     */
    getDescription(): string {
        return this.overview;
    }

    /**
     * @override
     */
    getType(): VID_TYPE_ENUM {
        return VID_TYPE_ENUM.TV_SERIES;
    }

    /**
     * @override
     */
    getPosterImage(): string {
        return this.posterImage;
    }

    /**
     * @override
     */
    getBackdropImage(): string {
        return this.backdropImage;
    }

    /**
     * @override
     */
    getGenresFormatted(): string {
        return this._rawData.genre_ids.map((id) => {
            return GenreService.getTVSeriesGenreById(id);
        }).join(", ");
    }

    /**
     * @override
     */
    isFavaourite(): boolean {
        const isFav = !!PopularTVSeriesModel.favIDs[this.getId()];
        return isFav;
    }

}
