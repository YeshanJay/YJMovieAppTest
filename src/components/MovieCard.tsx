import React, { PureComponent } from "react";
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Image, TouchableOpacityProps, Platform } from "react-native";
import PropTypes from "prop-types";
import { BaseMovieModel } from "../models/BaseMovieModel";
import { Console } from "../utils/ConsoleLog";



type PropDef = TouchableOpacityProps & {
    /**
     * Required model for the component.
     */
    movieModel: BaseMovieModel;

    /**
     * Shimmer mode to show when it's loading.
     */
    shimmer?: boolean;

    /**
     * Compact mode. Mainly used for horizontal list views.
     */
    compactMode?: boolean;
};
type StateDef = {

};

export class MovieCardExt {
    static get CARD_WIDTH() {
        if (typeof styles.container.width != "number") {
            return undefined;
        }
        return styles.container.width;
    }
    static get CARD_HEIGHT() {
        return styles.container.height;
    }

    static get CARD_COMPACT_WIDTH() {
        return styles.container_compact.width + (styles.container_compact.marginHorizontal * 2);
    }
}

export class MovieCard extends PureComponent<PropDef, StateDef> {


    static propTypes = {
        shimmer: PropTypes.bool,
        compactMode: PropTypes.bool
    };

    static defaultProps = {
        shimmer: false,
        compactMode: false
    };


    constructor(props: PropDef) {
        super(props);

        this.state = {

        };
    }


    renderShortDescription() {
        const { movieModel } = this.props;

        return (
            <Text
                numberOfLines={3}
                style={styles.desc}
            >{movieModel.getDescription()}</Text>
        );
    }

    renderTitle() {
        const { movieModel, compactMode } = this.props;

        let styTitleCompact = null;
        if (compactMode) {
            styTitleCompact = styles.title_compact;
        }

        return (
            <Text
                numberOfLines={1}
                style={[styles.title, styTitleCompact]}
            >{movieModel.getTitle()}</Text>
        );
    }

    renderGenreList() {
        const { movieModel } = this.props;

        return (
            <Text
                numberOfLines={2}
                style={styles.genre_text}
            >{movieModel.getGenresFormatted()}</Text>
        );
    }

    renderBody_Compact() {
        const { movieModel, compactMode } = this.props;
        const imageUrl = movieModel.getPosterImage();

        return (
            <>
                <Image
                    source={{
                        uri: imageUrl,
                        // height: styles.img.height
                    }}
                    style={styles.img}
                    resizeMode="cover"
                />
                <View style={{ padding: 5 }}>
                    {this.renderTitle()}
                    {this.renderGenreList()}
                </View>
            </>
        );
    }

    renderBody_Default() {
        const { movieModel, compactMode } = this.props;
        const imageUrl = movieModel.getBackdropImage();

        return (
            <ImageBackground
                source={{
                    uri: imageUrl
                }}
                style={styles.img_bg}
                resizeMode="cover"
            >
                <View style={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: "100%",
                    paddingVertical: 15,
                    paddingHorizontal: 10,

                    backgroundColor: "rgba(0, 0, 0, 0.3)"
                }}>
                    {this.renderShortDescription()}
                    {this.renderTitle()}
                </View>
            </ImageBackground>
        );
    }

    renderBody() {
        const { compactMode } = this.props;

        if (compactMode) {
            return this.renderBody_Compact();
        }

        return this.renderBody_Default();
    }

    render() {
        const { compactMode } = this.props;

        let styCompact = null;
        let styShadow = null;
        if (compactMode) {
            styCompact = styles.container_compact;
            styShadow = styles.container_shadow;
        }

        return (
            <TouchableOpacity
                activeOpacity={0.5}
                {...this.props}
                style={[styles.container, styCompact, styShadow]}
            >
                {this.renderBody()}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        width: (Platform.isTV ? (Platform.OS == "ios" ? 800 : 600) : "100%"),
        height: (Platform.isTV && Platform.OS == "ios" ? 500 : 300),
        margin: 10,
        borderRadius: 8,
        backgroundColor: "#E0E0E0"
    },
    container_compact: {
        borderRadius: 8,
        width: 160,
        height: 250,
        marginHorizontal: 10,
        marginVertical: 5
    },

    container_shadow: {
        shadowColor: "#000000",
        shadowOpacity: 0.24,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2
        },

        elevation: 2
    },

    img_bg: {
        flex: 1,
        width: "100%",
        height: (Platform.isTV ? 500 : 300),

        borderRadius: 8,
        overflow: "hidden"
    },

    img: {
        width: "100%",
        height: 190,

        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        overflow: "hidden"
    },


    title: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#FFF"
    },
    title_compact: {
        fontSize: 16,
        color: "#212121"
    },

    desc: {
        fontSize: 14,
        color: "#FFF",
        marginBottom: 10
    },

    genre_text: {
        fontSize: 12,
        color: "#424242",
        marginTop: 2
    }

});
