import { StackScreenProps } from "@react-navigation/stack";
import React, { Component } from "react";
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

        return (
            <Text
                style={styles.desc}
            >{baseModel.getDescription()}</Text>
        );
    }

    renderTitle() {
        const { baseModel } = this.state;

        return (
            <Text
                style={styles.title}
            >{baseModel.getTitle()}</Text>
        );
    }

    renderGenreList() {
        const { baseModel } = this.state;

        return (
            <Text
                style={styles.genre_text}
            >{baseModel.getGenresFormatted()}</Text>
        );
    }

    renderPlayFab() {

        return (
            <TouchableOpacity
                style={styles.play_fab}
                onPress={this.onPress_PlayFab}
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

                        <Text style={styles.header_title}>Details</Text>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        );
    }

    render() {

        return (
            <View style={styles.container}>
                {this.renderHeader()}

                <View style={{ flex: 1 }}>
                    {this.renderPlayFab()}

                    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
                        {this.renderTitle()}
                        {this.renderGenreList()}
                        {this.renderShortDescription()}
                    </ScrollView>
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

    title: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#FFF"
    },
    desc: {
        fontSize: 14,
        color: "#FFF",
        marginTop: 10
    },
    genre_text: {
        fontSize: 12,
        color: "#424242",
        marginTop: 5
    }

});
