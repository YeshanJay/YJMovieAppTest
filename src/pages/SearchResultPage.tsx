import React, { Component } from "react";
import { ActivityIndicator, Dimensions, FlatList, NativeSyntheticEvent, Platform, SafeAreaView, StyleSheet, Text, TextInput, TextInputSubmitEditingEventData, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import pureBind from "pure-bind";
import { CustomSearchInput } from "../components/core/CustomSearchInput";
import { BaseMovieModel } from "../models/BaseMovieModel";
import { MovieService } from "../services/tmdb/MovieService";
import { MovieCard } from "../components/MovieCard";
import { PopularMovieModel } from "../models/PopularMovieModel";
import { Console } from "../utils/ConsoleLog";
import { StackScreenProps } from "@react-navigation/stack";
import { MainStackParamListDef } from "..";


type PropDef = StackScreenProps<MainStackParamListDef, "SearchResult"> & {

};
type StateDef = {
    isLoading: boolean;
    isLoadingMore: boolean;
    searchText: string;
    searchResults: BaseMovieModel[];
    resultsCount: number;
};

export class SearchResultPage extends Component<PropDef, StateDef> {

    private refSearchTextInput: TextInput = null;
    private _lastSearchedData = {
        text: "",
        lastSearchPage: 0,
        totalPageCount: 0
    };

    constructor(props: PropDef) {
        super(props);

        this.state = {
            isLoading: false,
            isLoadingMore: false,
            searchText: "",
            searchResults: [],
            resultsCount: 0
        };

        this.bindEvent();
        this.bindMethods();
    }



    /* ****************************************************************************************************
     * METHODS
     *****************************************************************************************************/

    bindEvent() {
        this.onPress_Back = this.onPress_Back.bind(this);
        this.onSubmitEditing_Search = this.onSubmitEditing_Search.bind(this);
        this.onPress_MovieCard = this.onPress_MovieCard.bind(this);
    }

    bindMethods() {
        this.renderItem = this.renderItem.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            if (this.refSearchTextInput) {
                this.refSearchTextInput.focus();
            }
        }, 500);
    }

    async loadSearchResults(searchText: string, append: boolean = false) {
        const mutState: StateDef = this.state;

        if (mutState.isLoading || mutState.isLoadingMore) {
            return;
        }

        if (!searchText) {
            this.setState({
                searchResults: []
            });
            return;
        }

        if (append && (this._lastSearchedData.lastSearchPage >= this._lastSearchedData.totalPageCount)) {
            return;
        }

        let startIndex = 1;
        if (append) {
            startIndex = this._lastSearchedData.lastSearchPage;

            mutState.isLoadingMore = true;
            this.setState({});
        } else {
            this._lastSearchedData.lastSearchPage = 1;

            mutState.isLoading = true;
            this.setState({ searchResults: [] });
        }

        try {
            const data = await MovieService.searchMovies(searchText, startIndex);
            if (data && data.results && data.results.length) {
                this._lastSearchedData.lastSearchPage = this._lastSearchedData.lastSearchPage + 1;
                this._lastSearchedData.text = searchText;
                this._lastSearchedData.totalPageCount = data.total_pages;

                this.setState({
                    isLoading: false,
                    isLoadingMore: false,
                    resultsCount: data.total_results,
                    searchResults: (
                        append ? [
                            ...this.state.searchResults,
                            ...data.results
                        ] : data.results
                    )
                });

            } else {
                this.setState({ isLoading: false, isLoadingMore: false });
            }
        } catch (error) {
            Console.error(error);
        }
    }



    /* ****************************************************************************************************
     * EVENTS
     *****************************************************************************************************/

    private onPress_Back() {
        const { navigation } = this.props;
        navigation.goBack();
    }

    private onSubmitEditing_Search(e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) {
        const searchText = e.nativeEvent.text;

        this.setState({
            searchText
        }, () => {
            this.loadSearchResults(searchText, false);
        });
    }

    private onPress_MovieCard(model: PopularMovieModel) {
        const { navigation } = this.props;
        navigation.navigate("MovieDetail", {
            baseModel: model
        });
    }



    /* ****************************************************************************************************
     * RENDER METHODS
     *****************************************************************************************************/

    renderHeader() {
        const { searchText } = this.state;

        return (
            <View style={styles.header_container}>
                <TouchableOpacity
                    style={styles.header_back}
                    onPress={this.onPress_Back}
                >
                    <Icon
                        name="arrow-left"
                        type="font-awesome"
                        size={20}
                        color="#BDBDBD"
                    />
                </TouchableOpacity>
                <CustomSearchInput
                    clearButton
                    replaceRightIconWithClear
                    textInputProps={{
                        ref: (ref) => {
                            this.refSearchTextInput = ref;
                        },
                        placeholder: "Search here",
                        value: searchText,
                        onChangeText: (text) => {
                            this.setState({ searchText: text });
                        },
                        onSubmitEditing: this.onSubmitEditing_Search
                    }}
                    rightIcon={
                        <Icon
                            name="search"
                            type="font-awesome"
                            size={20}
                            color="#BDBDBD"
                            containerStyle={{
                                marginLeft: 20
                            }}
                        />
                    }
                />
            </View>
        );
    }

    renderItem({ item: model, index }) {

        return (
            <MovieCard
                movieModel={model}
                rowMode
                onPress={pureBind(this.onPress_MovieCard, model)}
            />
        );
    }

    renderLoaderView() {

        return (
            <View
                style={styles.loader_view}
                removeClippedSubviews={false}
            >
                <ActivityIndicator
                    animating
                    size={36}
                    color={Platform.select({
                        android: "#BDBDBD",
                        ios: "#BDBDBD"
                    })}
                />
            </View>
        );
    }

    renderLoader() {
        const { isLoading } = this.state;

        if (!isLoading) {
            return null;
        }

        return this.renderLoaderView();
    }

    renderLoaderMore() {
        const { isLoadingMore } = this.state;

        if (!isLoadingMore) {
            return null;
        }

        return (
            <View style={styles.loadmore_cont}>
                {this.renderLoaderView()}
            </View>
        );
    }

    render() {
        const { searchResults } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                {this.renderHeader()}

                <FlatList
                    style={styles.list}
                    data={searchResults}
                    extraData={this.state}
                    showsVerticalScrollIndicator={false}
                    renderItem={this.renderItem}
                    ListFooterComponent={() => {
                        return this.renderLoaderMore();
                    }}
                    onEndReachedThreshold={0.2}
                    onEndReached={({ distanceFromEnd }) => {
                        this.loadSearchResults(
                            this._lastSearchedData.text,
                            true
                        );
                    }}
                    viewabilityConfig={{
                        itemVisiblePercentThreshold: 50
                    }}
                    keyExtractor={(item, index) => {
                        return "searchItem_" + item.getId() + "_" + index;
                    }}
                />

                {this.renderLoader()}
            </SafeAreaView>
        );
    }
}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#212121"
    },

    header_container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center"
    },
    header_back: {
        marginLeft: 20,
        marginRight: 10
    },

    loader_view: {
        flex: 1,
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        alignItems: "center",
        justifyContent: "center",
    },

    loadmore_cont: {
        flex: 1,
        height: 40
    },

    list: {
        flex: 1,
        marginTop: 10
    }

});
