import React, { PureComponent } from "react";
import { View, Text, StyleProp, ViewStyle, StyleSheet, ViewProps } from "react-native";
import PropTypes from "prop-types";
import { StyleUtils } from "../../utils/StyleUtils";



type ContentPropsDef = ViewProps & {};

/**
 * Padded component for the content of the `CustomSection` component.
 */
const PaddedContent: React.FunctionComponent<ContentPropsDef> = ({ style, children }) => {
    const styCont = StyleUtils.resolveStyleIntoArray(style);

    return (
        <View
            style={[styles.containerHorizontalPad, ...styCont]}
        >
            {children}
        </View>
    );
};



type PropsDef = ViewProps & {
    /**
     * The section title.
     */
    title: string;
    /**
     * The section sub title.
     */
    subTitle?: string;

    /**
     * Removes the top margin of the container.
     */
    removeTopMargin?: boolean;

    /**
     * Removes the bottom margin of the container.
     */
    removeBottomMargin?: boolean;

    /**
     * Removes the borders of the container.
     */
    removeBorders?: boolean;

    /**
     * Removes the horizontal padding to fit the content view to it's parent view.
     */
    removeContentPad?: boolean;

    /**
     * Removes the bottom padding.
     */
    removeBottomPad?: boolean;

    /**
     * Style for the header view.
     */
    headerStyle?: StyleProp<ViewStyle>;

    /**
     * Style for the content view.
     */
    contentViewStyle?: StyleProp<ViewStyle>;
};

type StateDef = {

};

export class CustomSection extends PureComponent<PropsDef, StateDef> {

    static propTypes = {
        title: PropTypes.string.isRequired,
        subTitle: PropTypes.string,

        largeTitle: PropTypes.bool,
        largeSubTitle: PropTypes.bool,

        removeTopMargin: PropTypes.bool,
        removeBottomMargin: PropTypes.bool,
        removeContentPad: PropTypes.bool,
        removeBottomPad: PropTypes.bool
    };

    static defaultProps = {
        subTitle: null,

        largeTitle: false,
        largeSubTitle: false,

        removeTopMargin: false,
        removeBottomMargin: false,
        removeContentPad: false,
        removeBottomPad: false,
    };

    static PaddedContent: typeof PaddedContent = PaddedContent;


    constructor(props) {
        super(props);

        this.state = {

        };
    }


    renderTitleText() {
        const { title } = this.props;

        return (
            <Text style={styles.titleText}>{title}</Text>
        );
    }

    renderSubTitleText() {
        const { subTitle } = this.props;

        if (!subTitle) {
            return null;
        }

        return (
            <Text style={styles.subTitleText}>{subTitle}</Text>
        );
    }

    renderHeader() {
        const { headerStyle } = this.props;
        const styHeader = StyleUtils.resolveStyleIntoArray(headerStyle);

        return (
            <View style={[styles.header, styles.containerHorizontalPad, ...styHeader]}>
                {this.renderTitleText()}
                {this.renderSubTitleText()}
            </View>
        );
    }

    renderContent() {
        const { children, contentViewStyle, removeContentPad } = this.props;

        const styCont = StyleUtils.resolveStyleIntoArray(contentViewStyle);
        let styContPad: StyleProp<ViewStyle> = {};
        if (!removeContentPad) {
            styContPad = styles.containerHorizontalPad;
        }

        return (
            <View
                style={[styContPad, ...styCont]}
            >
                {children}
            </View>
        );
    }

    render() {
        const { style, removeTopMargin, removeBottomMargin, removeBottomPad, removeBorders } = this.props;

        const sty = StyleUtils.resolveStyleIntoArray(style);


        let styVMargin = {
            ...(removeTopMargin ? null : styles.containerTopMargin),
            ...(removeBottomMargin ? null : styles.containerBottomMargin),
        };
        let styVPad = {
            ...styles.containerTopPad,
            ...(removeBottomPad ? null : styles.containerBottomPad)
        };

        let styBorders = null;
        if (!removeBorders) {
            styBorders = styles.containerBorders;
        }

        return (
            <View
                style={[styles.container, styBorders, styVMargin, styVPad, ...sty]}
            >
                <View style={styles.innerContainer}>
                    {this.renderHeader()}
                    {this.renderContent()}
                </View>
            </View>
        );
    }

}


const styles = StyleSheet.create({

    container: {
        backgroundColor: "#171717",
    },
    containerBorders: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#E8E8E8"
    },

    innerContainer: {
        // flex: 1,
    },

    containerHorizontalPad: {
        paddingHorizontal: 16
    },

    containerTopMargin: {
        marginTop: 8
    },
    containerBottomMargin: {
        marginBottom: 8
    },

    containerTopPad: {
        paddingTop: 24
    },
    containerBottomPad: {
        paddingBottom: 24
    },

    header: {
        paddingBottom: 24
    },

    titleText: {
        fontSize: 18,
        lineHeight: 24,
        color: "#FFF"
    },

    subTitleText: {
        fontSize: 14,
        lineHeight: 20,
        color: "#BDBDBD",
        marginTop: 4
    }

});