import React, { PureComponent } from "react";
import {
    TextInput, TextInputProps, StyleSheet, Platform, View, Text, TouchableOpacity,
    ViewProps, StyleProp, ViewStyle, TextStyle, TouchableOpacityProps, Animated
} from "react-native";
import PropTypes from "prop-types";
import { StyleUtils } from "../../utils/StyleUtils";
import { Icon } from "react-native-elements";



type PropsDef = ViewProps & {
    textInputProps?: TextInputProps & { ref?: (ref: TextInput) => void; };
    textInputStyle?: StyleProp<TextStyle>;
    buttonViewProps?: TouchableOpacityProps;

    leftIcon?: any;
    rightIcon?: any;

    buttonify?: boolean;
    clearButton?: boolean;
    replaceRightIconWithClear?: boolean;
    autoFocusOnClear?: boolean;
};
type StateDef = {
    value: string;
};

export class CustomSearchInput extends PureComponent<PropsDef, StateDef> {

    static propTypes = {
        buttonify: PropTypes.bool,
        clearButton: PropTypes.bool,
        replaceRightIconWithClear: PropTypes.bool,
        autoFocusOnClear: PropTypes.bool
    };

    static defaultProps = {
        leftIcon: null,
        rightIcon: null,
        buttonify: false,
        clearButton: false,
        replaceRightIconWithClear: false,
        autoFocusOnClear: false
    };

    private refTextInput: TextInput = null;

    constructor(props: PropsDef) {
        super(props);

        this.state = {
            value: ""
        };

        this.bindMethods();
        this.bindEvents();
    }



    /* ****************************************************************************************************
     * METHODS
     *****************************************************************************************************/

    bindMethods() {

    }

    bindEvents() {
        this.onPress_ClearText = this.onPress_ClearText.bind(this);
    }


    /* ****************************************************************************************************
     * EVENTS
     *****************************************************************************************************/

    onPress_ClearText() {
        const { autoFocusOnClear, textInputProps } = this.props;

        if (textInputProps && textInputProps.onChangeText) {
            textInputProps.onChangeText("");
        }
        if (autoFocusOnClear && this.refTextInput) {
            this.refTextInput.focus();
        }
    }


    /* ****************************************************************************************************
     * RENDER METHODS
     *****************************************************************************************************/

    renderRightIcon() {
        const { rightIcon, replaceRightIconWithClear, textInputProps } = this.props;
        const value = textInputProps ? textInputProps.value : "";

        if (rightIcon) {
            if (replaceRightIconWithClear && value) {
                return null;
            }

            return (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {rightIcon}
                </View>
            );
        }

        return null;
    }

    renderRightClearButton() {
        const { clearButton, textInputProps } = this.props;
        const value = textInputProps ? textInputProps.value : "";

        if (!clearButton || !value) {
            return null;
        }

        return (
            <TouchableOpacity
                style={{
                    margin: 0,
                    marginLeft: 20
                }}
                onPress={this.onPress_ClearText}
            >
                <Icon
                    name="close"
                    type="font-awesome"
                    size={20}
                    color="#BDBDBD"
                />
            </TouchableOpacity>
        );
    }

    renderButtonText() {
        const { buttonify, textInputProps: { placeholder, value } } = this.props;
        const isPlaceholder = !value;

        const styPh = !buttonify && isPlaceholder ? styles.placeholder_text : null;

        return (
            <Text style={[styles.text, styles.text_button, styPh]} >{value || placeholder}</Text>
        );
    }

    renderButton() {
        const { style } = this.props;
        const sty = StyleUtils.resolveStyleIntoArray(style);

        return (
            <View style={styles.button_view}>
                {this.renderButtonText()}
            </View>
        );
    }

    renderTextInput() {
        const { textInputProps, textInputStyle } = this.props;

        const sty = StyleUtils.resolveStyleIntoArray(textInputStyle);

        return (
            <TextInput
                placeholderTextColor={styles.placeholder_text.color}

                {...textInputProps}

                ref={(ref) => {
                    this.refTextInput = ref;

                    if (textInputProps && textInputProps.ref) {
                        textInputProps.ref(ref);
                    }
                }}
                style={[styles.text_input, styles.text, ...sty]}
            />
        );
    }

    render() {
        const { buttonViewProps, style, buttonify } = this.props;
        const sty = StyleUtils.resolveStyleIntoArray(style);

        let styShadow: StyleProp<ViewStyle> = null;


        if (buttonify) {

            return (
                <TouchableOpacity
                    activeOpacity={0.8}
                    {...buttonViewProps}
                    style={[styles.container, styles.container_border_radius, styShadow, ...sty]}
                >
                    <View style={[styles.container_inner, styles.container_inner_button]}>
                        {/* {this.renderLeftIcon()} */}
                        {this.renderButton()}
                        {this.renderRightIcon()}
                    </View>
                </TouchableOpacity>
            );
        }

        return (
            <View style={{ flex: 1 }}>
                <Animated.View
                    {...this.props}
                    style={[styles.container, styles.container_border_radius, styShadow, ...sty]}
                >
                    <View style={styles.container_inner}>
                        {/* {this.renderLeftIcon()} */}
                        {this.renderTextInput()}
                        {this.renderRightClearButton()}
                        {this.renderRightIcon()}
                    </View>

                </Animated.View>
            </View>
        );
    }

}


const styles = StyleSheet.create({

    container: {
        paddingRight: 20,
        backgroundColor: "#212121"
    },
    container_border_radius: {
        // borderRadius: Platform.select({
        //     ios: 24,
        //     android: 28
        // })
    },

    container_inner: {
        flexDirection: "row",
        alignItems: "center"
    },
    container_inner_button: {
        justifyContent: "center",
        alignItems: "center"
    },

    text_input: {
        flex: 1,
        margin: 0,
        padding: 0,
        borderRadius: 0,
        paddingVertical: 12,
        paddingLeft: 20
    },

    button_view: {
        flex: 1,
        paddingVertical: 12,
        paddingLeft: 20,
    },

    text: {
        fontSize: (Platform.OS == "ios" && Platform.isTV ? 20 : 16),
        color: "#FAFAFA"
    },
    text_button: {
        fontSize: (Platform.OS == "ios" && Platform.isTV ? 20 : 16)
    },

    placeholder_text: {
        color: "#BDBDBD"
    }

});
