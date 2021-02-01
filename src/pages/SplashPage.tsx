import React, { Component, useCallback, useEffect, useState } from "react";
import { Button, Dimensions, FlatList, Text, TouchableOpacity, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { NativeStackDescriptor } from "react-native-screens/lib/typescript/types";
import { TMDBService } from "../services/tmdb/TMDBService";
import { Console } from "../utils/ConsoleLog";
import { SplashStackParamListDef } from "..";


type PropDef = StackScreenProps<SplashStackParamListDef, "Splash"> & {

};


const SplashPage: React.FunctionComponent<PropDef> = ({ navigation, route }) => {
    const [test, setTest] = useState(false);

    useEffect(() => {
        fetchConfig();
    }, []);


    /* ****************************************************************************************************
     * METHODS
     *****************************************************************************************************/

    const fetchConfig = useCallback(async () => {
        // const data = await TMDBService.getConfig();

        // Console.debug("Config= ", data);
    }, []);



    /* ****************************************************************************************************
     * EVENTS
     *****************************************************************************************************/

    const onPress = useCallback(() => {
        fetchConfig();
        setTest(true);

        route.params.setSplashLoad(false);
    }, []);



    /* ****************************************************************************************************
     * RENDER METHODS
     *****************************************************************************************************/

    return (
        <View style={{ flex: 1 }}>
            <Text style={{ marginTop: 50 }}>Splash page</Text>

            <Button title="Press" onPress={onPress} />
        </View>
    )
}

export { SplashPage };
