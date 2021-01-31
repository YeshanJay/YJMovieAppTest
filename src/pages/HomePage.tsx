import React, { Component } from "react";
import { Dimensions, FlatList, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackDescriptor } from "react-native-screens/lib/typescript/types";
import Carousel from "react-native-snap-carousel";
import StaticSafeAreaInsets from "react-native-static-safe-area-insets";
import pureBind from "pure-bind";
import { MovieCard, MovieCardExt } from "../components/MovieCard";
import { AppConfig } from "../constants/AppConfig";
import { PopularMovieModel } from "../models/PopularMovieModel";
import { GenreService } from "../services/tmdb/GenreService";
import { MovieService } from "../services/tmdb/MovieService";
import { TMDBService } from "../services/tmdb/TMDBService";
import { TMImageService } from "../services/tmdb/TMImageService";
import { CustomSection } from "../components/core/CustomSection";
import { Console } from "../utils/ConsoleLog";
import { PopularTVSeriesModel } from "../models/PopularTVSeriesModel";
import { TVSeriesService } from "../services/tmdb/TVSeriesService";


type PropDef = NativeStackDescriptor & {

};
type StateDef = {
    popularMovies: PopularMovieModel[];
    familyMovies: PopularMovieModel[];
    documentaryMovies: PopularMovieModel[];
    popularTVSeries: PopularTVSeriesModel[];
    safeAreaInsets: { top: number; right: number; bottom: number; left: number; };
};

export class HomePage extends Component<PropDef, StateDef> {

    private _carousel: Carousel<PopularMovieModel> = null;

    constructor(props: PropDef) {
        super(props);

        this.state = {
            popularMovies: [],
            familyMovies: [],
            documentaryMovies: [],
            popularTVSeries: [],
            safeAreaInsets: { top: 0, right: 0, bottom: 0, left: 0 }
        };

        this.bindEvents();
    }



    /* ****************************************************************************************************
     * METHODS
     *****************************************************************************************************/

    private bindEvents() {
        this.onPress_MovieCard = this.onPress_MovieCard.bind(this);
        this.onPress_TVSeriesCard = this.onPress_TVSeriesCard.bind(this);
    }

    async componentDidMount() {
        this._updateSafeAreaInsets();

        await this.loadConfig();
        this.loadPopularMovies();
        this.loadFamilyMovies();
        this.loadDocumentaryMovies();
        this.loadPopularTVSeries();

        Dimensions.addEventListener("change", () => {
            this._updateSafeAreaInsets();
        });
    }

    private _updateSafeAreaInsets() {
        if (Platform.OS == "android" || Platform.isTV) {
            // NOTE: `react-native-static-safe-area-insets` needs fixing for Android.
            // java.lang.ClassCastException: java.lang.Float cannot be cast to java.lang.Integer
            // at com.gaspardbruno.staticsafeareainsets.RNStaticSafeAreaInsetsModule.getSafeAreaInsets(RNStaticSafeAreaInsetsModule.java:65)
            return;
        }

        StaticSafeAreaInsets.getSafeAreaInsets((insets) => {
            this.setState({
                safeAreaInsets: {
                    top: insets.safeAreaInsetsTop,
                    right: insets.safeAreaInsetsRight,
                    bottom: insets.safeAreaInsetsBottom,
                    left: insets.safeAreaInsetsLeft
                }
            });
        });
    }

    async loadConfig() {
        GenreService.loadGenreList();

        const data = await TMDBService.fetchConfig();
        if (data && data.images) {
            AppConfig.setBaseImageUrl(data.images.secure_base_url);
            TMImageService.setSizeConfig_Poster(data.images.poster_sizes);
            TMImageService.setSizeConfig_Backdrop(data.images.backdrop_sizes);
        }
    }

    async loadPopularMovies() {
        const data = await MovieService.fetchPopularMovieModels();
        if (data && data.results) {
            this.setState({ popularMovies: data.results });
        }
    }

    async loadFamilyMovies() {
        const genreIds = GenreService.getMovieGenreIdsByCodes("Family");
        const data = await MovieService.discoverMovies(1, {
            withGenres: {
                ids: genreIds,
                op: "AND"
            }
        });
        if (data && data.results) {
            this.setState({ familyMovies: data.results });
        }
    }

    async loadDocumentaryMovies() {
        const genreIds = GenreService.getMovieGenreIdsByCodes("Documentary");
        const data = await MovieService.discoverMovies(1, {
            withGenres: {
                ids: genreIds,
                op: "AND"
            }
        });
        if (data && data.results) {
            this.setState({ documentaryMovies: data.results });
        }
    }

    async loadPopularTVSeries() {
        const data = await TVSeriesService.fetchPopularTVSeriesModels();
        if (data && data.results) {
            this.setState({ popularTVSeries: data.results });
        }
    }



    /* ****************************************************************************************************
     * EVENTS
     *****************************************************************************************************/

    private onPress_MovieCard(model: PopularMovieModel) {
        const { navigation } = this.props;
        navigation.navigate("MovieDetail", {

        });
    }

    private onPress_TVSeriesCard(model: PopularTVSeriesModel) {
        const { navigation } = this.props;
        navigation.navigate("MovieDetail", {

        });
    }



    /* ****************************************************************************************************
     * RENDER METHODS
     *****************************************************************************************************/

    renderHeader() {

        return (
            null  
        );
    }

    render() {
        const { safeAreaInsets, popularMovies, familyMovies, documentaryMovies, popularTVSeries } = this.state;

        const screen_width = Dimensions.get("screen").width - (Platform.isTV && Platform.OS == "ios" ? 160 : (safeAreaInsets.left + safeAreaInsets.right));

        return (
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: "#212121"
            }}>
                <ScrollView style={{ flex: 1 }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("MovieDetail");
                        }}
                    >
                        <Text >Press Me</Text>
                    </TouchableOpacity>


                    <View style={{ flex: 1, height: MovieCardExt.CARD_HEIGHT + 20, marginVertical: 40 }}>

                        <Carousel<PopularMovieModel>
                            ref={(c) => { this._carousel = c; }}
                            data={popularMovies}
                            useScrollView={Platform.isTV}
                            renderItem={({ item, index }) => {

                                return (
                                    <MovieCard
                                        movieModel={item}
                                        activeOpacity={0.8}
                                        onPress={pureBind(this.onPress_MovieCard, item)}
                                        onFocus={() => {
                                            const ii = index;
                                            if (Platform.isTV && Platform.OS == "ios" && this._carousel) {
                                                this._carousel.snapToItem(ii, true);
                                            }
                                        }}
                                    />
                                );
                            }}
                            sliderWidth={screen_width}
                            itemWidth={Platform.isTV ? MovieCardExt.CARD_WIDTH : (screen_width - 60)}
                            itemHeight={MovieCardExt.CARD_HEIGHT}
                            keyExtractor={(item) => {
                                return "c_item_" + item.getId();
                            }}
                        />
                    </View>


                    <CustomSection
                        title="Popular Movies"
                        subTitle="Just testing this"
                        removeBorders
                        removeContentPad
                    >
                        <FlatList
                            contentContainerStyle={{ paddingHorizontal: 8 }}

                            horizontal
                            pagingEnabled
                            decelerationRate="fast"
                            showsHorizontalScrollIndicator={false}
                            snapToInterval={MovieCardExt.CARD_COMPACT_WIDTH}

                            data={popularMovies}
                            renderItem={({ item, index }) => {

                                return (
                                    <MovieCard
                                        movieModel={item}
                                        compactMode
                                        onPress={pureBind(this.onPress_MovieCard, item)}
                                    />
                                );
                            }}
                            keyExtractor={(item, index) => {
                                return "" + index;
                            }}
                        />
                    </CustomSection>

                    <CustomSection
                        title="Popular TV Series"
                        removeBorders
                        removeContentPad
                    >
                        <FlatList
                            contentContainerStyle={{ paddingHorizontal: 8 }}

                            horizontal
                            pagingEnabled
                            decelerationRate="fast"
                            showsHorizontalScrollIndicator={false}
                            snapToInterval={MovieCardExt.CARD_COMPACT_WIDTH}

                            data={popularTVSeries}
                            renderItem={({ item, index }) => {

                                return (
                                    <MovieCard
                                        movieModel={item}
                                        compactMode
                                        onPress={pureBind(this.onPress_TVSeriesCard, item)}
                                    />
                                );
                            }}
                            keyExtractor={(item, index) => {
                                return "" + index;
                            }}
                        />
                    </CustomSection>

                    <CustomSection
                        title="Family Movies"
                        removeBorders
                        removeContentPad
                    >
                        <FlatList
                            contentContainerStyle={{ paddingHorizontal: 8 }}

                            horizontal
                            pagingEnabled
                            decelerationRate="fast"
                            showsHorizontalScrollIndicator={false}
                            snapToInterval={MovieCardExt.CARD_COMPACT_WIDTH}

                            data={familyMovies}
                            renderItem={({ item, index }) => {

                                return (
                                    <MovieCard
                                        movieModel={item}
                                        compactMode
                                        onPress={pureBind(this.onPress_MovieCard, item)}
                                    />
                                );
                            }}
                            keyExtractor={(item, index) => {
                                return "" + index;
                            }}
                        />
                    </CustomSection>

                    <CustomSection
                        title="Documentary Movies"
                        removeBorders
                        removeContentPad
                    >
                        <FlatList
                            contentContainerStyle={{ paddingHorizontal: 8 }}

                            horizontal
                            pagingEnabled
                            decelerationRate="fast"
                            showsHorizontalScrollIndicator={false}
                            snapToInterval={MovieCardExt.CARD_COMPACT_WIDTH}

                            data={documentaryMovies}
                            renderItem={({ item, index }) => {

                                return (
                                    <MovieCard
                                        movieModel={item}
                                        compactMode
                                        onPress={pureBind(this.onPress_MovieCard, item)}
                                    />
                                );
                            }}
                            keyExtractor={(item, index) => {
                                return "" + index;
                            }}
                        />
                    </CustomSection>

                </ScrollView>
            </SafeAreaView>
        );
    }
}
