
export abstract class BaseMovieModel {
    protected constructor() {}

    abstract getId(): number;
    abstract getTitle(): string;
    abstract getDescription(): string;
    abstract getPosterImage(): string;
    abstract getBackdropImage(): string;
    abstract getGenresFormatted(): string;
    
    getVideoUrl(): string {
        return "https://rawgit.com/mediaelement/mediaelement-files/master/big_buck_bunny.mp4";
    }
}
