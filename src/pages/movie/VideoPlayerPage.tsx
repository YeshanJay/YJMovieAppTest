import { StackScreenProps } from "@react-navigation/stack";
import React, { Component } from "react";
import { Easing, ImageBackground, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import Orientation from "react-native-orientation";
import Animated from "react-native-reanimated";
import Video from "react-native-video";
import { MainStackParamListDef } from "../..";
import { BaseMovieModel } from "../../models/BaseMovieModel";
import { Console } from "../../utils/ConsoleLog";

const AnimSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);


type PropDef = StackScreenProps<MainStackParamListDef, "MovieDetail"> & {

};
type StateDef = {
    baseModel: BaseMovieModel;
    isPlaying: boolean;
    animVal: Animated.Value<number>;
};

export class VideoPlayerPage extends Component<PropDef, StateDef> {

    private refPlayer: Video = null;

    constructor(props: PropDef) {
        super(props);

        let model = null;
        if (props.route && props.route.params && props.route.params.baseModel) {
            model = props.route.params.baseModel;
        }

        this.state = {
            baseModel: model,
            isPlaying: false,
            animVal: new Animated.Value(1)
        };

        this.bindEvent();
    }

    /* ****************************************************************************************************
     * METHODS
     *****************************************************************************************************/

    bindEvent() {
        this.onPress_Back = this.onPress_Back.bind(this);
    }

    componentDidMount() {
        if (!Platform.isTV) {
            Orientation.lockToLandscape();
            Orientation.lockToLandscape();
        }
    }

    componentWillUnmount() {
        if (!Platform.isTV) {
            Orientation.unlockAllOrientations();
        }
    }

    // updateHeader() {
    //     const { isPlaying, animVal } = this.state;

    //     Animated.timing(animVal, {
    //         toValue: isPlaying ? 0 : 1,
    //         duration: 200,
    //         easing: Easing.inOut(Easing.ease)
    //     });
    // }



    /* ****************************************************************************************************
     * EVENTS
     *****************************************************************************************************/

    private onPress_Back() {
        const { navigation } = this.props;
        navigation.goBack();
    }



    /* ****************************************************************************************************
     * RENDER METHODS
     *****************************************************************************************************/


    renderHeader() {
        const { baseModel, animVal } = this.state;
        const imageUrl = baseModel.getBackdropImage();

        return (

            <AnimSafeAreaView style={[styles.header_safearea, {
                opacity: animVal
            }]}>
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

                    <Text style={styles.header_title}>Details</Text>
                </View>
            </AnimSafeAreaView>
        );
    }

    render() {
        const { baseModel } = this.state;

        const videoUrl = baseModel.getVideoUrl();

        return (
            <View style={styles.container}>
                <View style={styles.video_container}>
                    <Video
                        ref={(ref) => {
                            this.refPlayer = ref
                        }}
                        source={{
                            uri: videoUrl
                        }}
                        controls
                        onTimedMetadata={() => {
                            Console.debug("onTimedMetadata - ");
                        }}
                        onError={(error) => {
                            Console.debug("onError - ", error);
                        }}
                        style={styles.video}
                    />
                </View>
                {this.renderHeader()}
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
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.4)"
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

    video_container: {
        flex: 1,
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: "100%"
    },
    video: {
        flex: 1,
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        
        width: "100%",
        height: "100%",
        backgroundColor: "#171717"
    }

});
