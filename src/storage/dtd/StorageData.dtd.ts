

export interface AppDataStorageDTD {

}

export interface FavouriteStorageDTD {
    movies: { [movieId: number]: boolean; }
    tvSeries: { [tvId: number]: boolean; }
}
