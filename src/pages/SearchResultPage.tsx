import React, { Component } from "react";
import { Dimensions, FlatList, Text, TouchableOpacity, View } from "react-native";
import { NativeStackDescriptor } from "react-native-screens/lib/typescript/types";


type PropDef = NativeStackDescriptor & {

};

export class SearchResultPage extends Component<PropDef> {


    render() {

        return (
            <View style={{ flex: 1 }}>

                <Text style={{ marginTop: 50 }}>Search Result page</Text>

            </View>
        );
    }
}
