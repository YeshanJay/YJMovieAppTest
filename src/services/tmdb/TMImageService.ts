import { AppConfig } from "../../constants/AppConfig";
import { TMDB_SizeDef } from "./dtd/TMDB-dtd";


export enum IMAGE_SIZE_ENUM {
    ORIGINAL = "original",
    LARGE = "large",
    MEDIUM = "medium",
    SMALL = "small",
}

type SizeMapDef = { [key: string]: TMDB_SizeDef };

export class TMImageService {

    private static posterSizes: SizeMapDef = {
        original: "original",
        large: "original",
        medium: "original",
        small: "original"
    };
    private static backdropSizes: SizeMapDef = {
        original: "original",
        large: "original",
        medium: "original",
        small: "original"
    };

    private constructor() { }

    /**
     * Gets the Poster image url.
     * 
     * @param url The image url path.
     * @param sizeEnum The size enum (Default is `original`).
     */
    static getPosterImageUrl(url: string, sizeEnum: IMAGE_SIZE_ENUM = IMAGE_SIZE_ENUM.ORIGINAL): string {
        const size = TMImageService.posterSizes[sizeEnum];

        return `${AppConfig.TMDB_IMAGE_BASE_URL}${size}${url}`;
    }

    /**
     * Gets the Backdrop image url.
     * 
     * @param url The image url path.
     * @param sizeEnum The size enum (Default is `original`).
     */
    static getBackdropImageUrl(url: string, sizeEnum: IMAGE_SIZE_ENUM = IMAGE_SIZE_ENUM.ORIGINAL): string {
        const size = TMImageService.backdropSizes[sizeEnum];

        return `${AppConfig.TMDB_IMAGE_BASE_URL}${size}${url}`;
    }




    /**
     * Sets the size configurations for Posters
     * 
     * @param sizes List of sizes from config.
     */
    static setSizeConfig_Poster(sizes: TMDB_SizeDef[]) {
        TMImageService.setSizeConfig(sizes, TMImageService.posterSizes)
    }

    /**
     * Sets the size configurations for Posters
     * 
     * @param sizes List of sizes from config.
     */
    static setSizeConfig_Backdrop(sizes: TMDB_SizeDef[]) {
        TMImageService.setSizeConfig(sizes, TMImageService.backdropSizes)
    }

    /**
     * Sets the size configurations.
     * 
     * @param sizes List of sizes from config.
     * @param sizeMapping The size value mapping object.
     */
    private static setSizeConfig(sizes: TMDB_SizeDef[], sizeMapping: SizeMapDef) {
        if (sizeMapping && sizes && sizes.length) {
            const steps = 4;
            let count = sizes.length;
            const actualSteps = count < steps ? count : steps;
            let step = 1;

            for (let i = sizes.length - 1; i >= count - actualSteps; i--) {
                const size = sizes[i];

                switch (step) {
                    case 1:
                        sizeMapping[IMAGE_SIZE_ENUM.ORIGINAL] = size;
                        break;
                    case 2:
                        sizeMapping[IMAGE_SIZE_ENUM.LARGE] = size;
                        break;
                    case 3:
                        sizeMapping[IMAGE_SIZE_ENUM.MEDIUM] = size;
                        break;
                    case 4:
                        sizeMapping[IMAGE_SIZE_ENUM.SMALL] = size;
                        break;
                }

                ++step
            }
        }
    }

}