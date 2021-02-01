import { ServiceUrls } from "../../constants/ServiceUrls";
import { Console } from "../../utils/ConsoleLog";
import { APIHelper } from "../APIHelper";
import { FetchGenreListResponseDTD, GenreDataDTD } from "./dtd/GenreTMDB-dtd";


export class GenreService {

    private static _movieGenre: GenreDataDTD[] = [];
    private static _tvGenre: GenreDataDTD[] = [];
    private static _movieGenreMap: { [id: number]: string } = {};
    private static _tvGenreMap: { [id: number]: string } = {};

    private constructor() { }



    /**
     * Loads movie genre list.
     */
    private static async loadMovieGenres(): Promise<void> {
        try {
            const res = await APIHelper.api.get<FetchGenreListResponseDTD>(ServiceUrls.API_TMDB_GET_GENRE_LIST__MOVIE);

            if (res.data && res.data.genres) {
                GenreService._movieGenre = res.data.genres;
                for (let i = 0; i < res.data.genres.length; i++) {
                    const genre = res.data.genres[i];
                    GenreService._movieGenreMap[genre.id] = genre.name;
                }
            }
        } catch (e) {
            Console.error(e);
        }
    }

    /**
     * Loads TV genre list.
     */
    private static async loadTVGenres(): Promise<void> {
        try {
            const res = await APIHelper.api.get<FetchGenreListResponseDTD>(ServiceUrls.API_TMDB_GET_GENRE_LIST__TV);

            if (res.data && res.data.genres) {
                GenreService._tvGenre = res.data.genres;
                for (let i = 0; i < res.data.genres.length; i++) {
                    const genre = res.data.genres[i];
                    GenreService._tvGenreMap[genre.id] = genre.name;
                }
            }
        } catch (e) {
            Console.error(e);
        }
    }

    /**
     * Loads the genre list for movies and TV series.
     */
    static loadGenreList(): void {
        GenreService.loadMovieGenres();
        GenreService.loadTVGenres();
    }

    /**
     * Gets the movie genre.
     */
    static getMovieGenreById(id: number): string {
        if (id) {
            return GenreService._movieGenreMap[id] || "";
        }
        return "";
    }

    /**
     * Gets the TV series genre.
     */
    static getTVSeriesGenreById(id: number): string {
        if (id) {
            return GenreService._tvGenreMap[id] || "";
        }
        return "";
    }

    /**
     * Gets movie genre ids by genre codes.
     */
    static getMovieGenreIdsByCodes(...genreCodes: string[]): number[] {
        const ids = [];
        if (genreCodes && genreCodes.length) {
            const mapCode = {};
            genreCodes.forEach((code) => {
                mapCode[code] = true;
            });

            for (let i = 0; i < GenreService._movieGenre.length; i++) {
                const genre = GenreService._movieGenre[i];
                if (mapCode[genre.name]) {
                    ids.push(genre.id);
                }
            }
        }
        return ids;
    }

    /**
     * Gets TV series genre ids by genre codes.
     */
    static getTVSeriesGenreIdsByCodes(...genreCodes: string[]): number[] {
        const ids = [];
        if (genreCodes && genreCodes.length) {
            const mapCode = {};
            genreCodes.forEach((code) => {
                mapCode[code] = true;
            });

            for (let i = 0; i < GenreService._tvGenre.length; i++) {
                const genre = GenreService._tvGenre[i];
                if (mapCode[genre.name]) {
                    ids.push(genre.id);
                }
            }
        }
        return ids;
    }



}