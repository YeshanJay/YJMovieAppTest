import { StackScreenProps } from "@react-navigation/stack";
import React, { Component } from "react";
import { Image, ImageBackground, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { MainStackParamListDef } from "../..";
import { BaseMovieModel } from "../../models/BaseMovieModel";


type PropDef = StackScreenProps<MainStackParamListDef, "MovieDetail"> & {

};
type StateDef = {
    baseModel: BaseMovieModel;
};

export class MovieDetailPage extends Component<PropDef, StateDef> {

    constructor(props: PropDef) {
        super(props);

        let model = null;
        if (props.route && props.route.params && props.route.params.baseModel) {
            model = props.route.params.baseModel;
        }

        this.state = {
            baseModel: model
        };

        this.bindEvent();
    }

    /* ****************************************************************************************************
     * METHODS
     *****************************************************************************************************/

    bindEvent() {
        this.onPress_Back = this.onPress_Back.bind(this);
        this.onPress_PlayFab = this.onPress_PlayFab.bind(this);
    }


    /* ****************************************************************************************************
     * EVENTS
     *****************************************************************************************************/

    private onPress_Back() {
        const { navigation } = this.props;
        navigation.goBack();
    }

    private onPress_PlayFab() {
        const { navigation } = this.props;
        const { baseModel } = this.state;
        navigation.navigate("VideoPlayer", {
            baseModel
        });
    }



    /* ****************************************************************************************************
     * RENDER METHODS
     *****************************************************************************************************/


    renderShortDescription() {
        const { baseModel } = this.state;

        let styTv = null;
        if (Platform.isTV) {
            styTv = styles.desc_tv;
        }

        return (
            <Text
                style={[styles.desc, styTv]}
            >{baseModel.getDescription()}</Text>
        );
    }

    renderTitle() {
        const { baseModel } = this.state;

        let styTv = null;
        if (Platform.isTV) {
            styTv = styles.title_tv;
        }

        return (
            <Text
                style={[styles.title, styTv]}
            >{baseModel.getTitle()}</Text>
        );
    }

    renderGenreList() {
        const { baseModel } = this.state;

        let styTv = null;
        if (Platform.isTV) {
            styTv = styles.genre_text_tv;
        }

        return (
            <Text
                style={[styles.genre_text, styTv]}
            >{baseModel.getGenresFormatted()}</Text>
        );
    }

    renderPlayFab() {
        let styTv = null;
        if (Platform.isTV) {
            styTv = styles.play_fab_tv;
        }

        return (
            <TouchableOpacity
                style={[styles.play_fab, styTv]}
                onPress={this.onPress_PlayFab}
                hasTVPreferredFocus
            >
                <Icon
                    name="play"
                    type="font-awesome"
                    size={20}
                    color="#FFF"
                />
            </TouchableOpacity>
        );
    }

    renderHeader() {
        if (Platform.isTV) {
            return;
        }

        const { baseModel } = this.state;
        const imageUrl = baseModel.getBackdropImage();

        return (
            <ImageBackground
                source={{
                    uri: imageUrl
                }}
                style={{
                    width: "100%",
                    height: 350
                }}
                resizeMode="cover"
            >
                <SafeAreaView style={styles.header_safearea}>
                    <View style={styles.header_container} >
                        {this.renderHeaderInner()}
                        <Text style={styles.header_title}>Details</Text>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        );
    }

    renderHeaderForTV() {
        if (!Platform.isTV) {
            return;
        }

        return this.renderHeaderInner();
    }

    renderHeaderInner() {
        let styTv = null;
        let iconSize = 20;
        if (Platform.isTV) {
            styTv = styles.header_back_tv;
            iconSize = 30;
        }

        return (
            <TouchableOpacity
                style={[styles.header_back, styTv]}
                onPress={this.onPress_Back}
            >
                <Icon
                    name="arrow-left"
                    type="font-awesome"
                    size={iconSize}
                    color="#BDBDBD"
                />
            </TouchableOpacity>
        );
    }

    renderFav() {
        const { baseModel } = this.state;
        const isFav = baseModel.isFavaourite();

        let styTv = null;
        let iconSize = 20;
        if (Platform.isTV) {
            styTv = styles.header_back_tv;
            iconSize = 30;
        }

        return (
            <TouchableOpacity
                style={[styles.header_back, styTv]}
                onPress={this.onPress_Back}
            >
                <Icon
                    name={isFav ? "heart" : "heart-o"}
                    type="font-awesome"
                    size={iconSize}
                    color="#FF5722"
                />
            </TouchableOpacity>
        );
    }

    renderTVView() {
        const { baseModel } = this.state;
        const imageUrl = baseModel.getPosterImage();

        return (
            <View style={{ flex: 1, padding: 20 }} >
                <View style={{ flexDirection: "row" }}>
                    <Image
                        source={{
                            uri: imageUrl
                        }}
                        style={{
                            width: 350,
                            height: 500
                        }}
                        resizeMode="cover"
                    />

                    <View style={{ flex: 1, padding: 20 }}>
                        {this.renderTitle()}
                        {this.renderGenreList()}
                        {this.renderShortDescription()}

                        {this.renderPlayFab()}
                        {this.renderFav()}
                        {this.renderHeaderForTV()}
                    </View>
                </View>
            </View>
        );
    }

    renderMobileView() {

        return (
            <>
                {this.renderPlayFab()}

                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
                    {this.renderTitle()}
                    {this.renderGenreList()}
                    {this.renderShortDescription()}
                </ScrollView>
            </>
        );
    }

    render() {

        return (
            <View style={styles.container}>
                {this.renderHeader()}
                {/* {this.renderHeaderForTV()} */}

                <View style={{ flex: 1 }}>
                    {
                        Platform.isTV ?
                            this.renderTVView() :
                            this.renderMobileView()
                    }
                </View>
            </View>
        );
    }
}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#212121"
    },

    header_safearea: {
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    header_container: {
        width: "100%",
        minHeight: 48,
        flexDirection: "row",
        alignItems: "center"
    },
    header_back: {
        marginLeft: 20,
        marginRight: 20
    },
    header_back_tv: {
        width: 80,
        height: 80,
        marginVertical: 40,
        marginHorizontal: 20
    },
    header_title: {
        fontSize: 18,
        color: "#BDBDBD"
    },

    play_fab: {
        width: 60,
        height: 60,
        marginTop: -30,
        marginRight: 30,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end",
        backgroundColor: "#2196F3"
    },
    play_fab_tv: {
        width: 80,
        height: 80,
        marginTop: 40,
        marginLeft: 20,
        marginRight: 0,
        borderRadius: 40,
        alignSelf: "flex-start",
    },

    title: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#FFF"
    },
    title_tv: {
        fontSize: 30,
    },
    desc: {
        fontSize: 14,
        color: "#FFF",
        marginTop: 10
    },
    desc_tv: {
        fontSize: 18,
    },
    genre_text: {
        fontSize: 12,
        color: "#757575",
        marginTop: 5
    },
    genre_text_tv: {
        fontSize: 14
    }

});
