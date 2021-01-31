import React, { Component } from "react";
import { Text, View } from "react-native";
import { NativeStackDescriptor } from "react-native-screens/lib/typescript/types";


type PropDef = NativeStackDescriptor & {

};

export class MovieDetailPage extends Component<PropDef> {


    render() {

        return (
            <View style={{ flex: 1 }}>

                <Text style={{ marginTop: 50 }}>Movie Detail page</Text>

            </View>
        );
    }
}
