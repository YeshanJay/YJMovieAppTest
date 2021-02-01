

export class AppConfig {

    private constructor() { }

    private static _TMDB_IMAGE_BASE_URL = null;
    static get TMDB_IMAGE_BASE_URL() {
        return AppConfig._TMDB_IMAGE_BASE_URL;
    }

    static setBaseImageUrl(url: string) {
        AppConfig._TMDB_IMAGE_BASE_URL = url;
    }

}
