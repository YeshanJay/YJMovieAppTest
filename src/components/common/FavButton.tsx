import React, { useCallback, useEffect, useState } from "react";
import { InteractionManager, Platform, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { BaseMovieModel, VID_TYPE_ENUM } from "../../models/BaseMovieModel";
import { PopularMovieModel } from "../../models/PopularMovieModel";
import { PopularTVSeriesModel } from "../../models/PopularTVSeriesModel";
import { ReduxStoreDef } from "../../redux/store/StoreDef";
import { FavouriteService } from "../../services/FavouriteService";


type PropDef = {
    baseModel: BaseMovieModel;
};

const FavButton: React.FunctionComponent<PropDef> = ({ baseModel, ...props }) => {

    // useEffect(() => {

    // }, []);



    /* ****************************************************************************************************
     * EVENTS
     *****************************************************************************************************/

    const onPress_FavButton = useCallback(() => {
        const isFav = !baseModel.isFavaourite();

        InteractionManager.runAfterInteractions(() => {
            switch (baseModel.getType()) {
                case VID_TYPE_ENUM.MOVIE:
                    FavouriteService.updateMovie_FavStatus(baseModel as PopularMovieModel, isFav);
                    break;

                case VID_TYPE_ENUM.TV_SERIES:
                    FavouriteService.updateTVSeries_FavStatus(baseModel as PopularTVSeriesModel, isFav);
                    break;
            }
        });
    }, []);



    /* ****************************************************************************************************
     * RENDER METHODS
     *****************************************************************************************************/

    let styTv = null;
    let iconSize = 20;
    if (Platform.isTV) {
        styTv = styles.header_back_tv;
        iconSize = 30;
    }
    const isFav = baseModel.isFavaourite();

    return (
        <TouchableOpacity
            style={[styles.header_back, styTv]}
            {...props}
            onPress={onPress_FavButton}
        >
            <Icon
                name={isFav ? "heart" : "heart-o"}
                type="font-awesome"
                size={iconSize}
                color="#FF5722"
            />
        </TouchableOpacity>
    )
}

const mapStateToProps = (state: ReduxStoreDef) => {

    return {
        favMovies: state.app.favMovies,
        favTVSeries: state.app.favTVSeries
    };
};

const mapDispatchToProps = dispatch => ({

});

const FavButtonCon: React.ComponentType<PropDef> = connect(
    mapStateToProps,
    mapDispatchToProps
)(FavButton);

export { FavButtonCon as FavButton };



const styles = StyleSheet.create({

    header_back: {
        marginLeft: 20,
        marginRight: 20
    },
    header_back_tv: {
        width: 80,
        height: 80,
        justifyContent: "center"
    }

});

