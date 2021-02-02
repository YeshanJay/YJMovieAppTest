
import React, { Component, useCallback, useState } from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";

import configureStore from "./redux/store/configureStore";

import { HomePage } from "./pages/HomePage";
import { MovieDetailPage } from "./pages/movie/MovieDetailPage";
import { SearchResultPage } from "./pages/SearchResultPage";
import { SplashPage } from "./pages/SplashPage";
import { BaseMovieModel } from "./models/BaseMovieModel";
import { VideoPlayerPage } from "./pages/movie/VideoPlayerPage";


enableScreens();


export const store = configureStore();


export type SplashStackParamListDef = {
    Splash: { setSplashLoad: (loading: boolean) => void; };
};
export type MainStackParamListDef = {
    Splash: { setSplashLoad: (loading: boolean) => void; };
    Home: undefined;
    SearchResult: undefined;
    MovieDetail: {
        baseModel: BaseMovieModel;
    };
    VideoPlayer: {
        baseModel: BaseMovieModel;
    };
};


const SplashStack = createNativeStackNavigator<SplashStackParamListDef>();
const MainStack = createNativeStackNavigator<MainStackParamListDef>();
// const RootStack = createNativeStackNavigator();


const App = () => {
    const [isLoading, setSplashLoad] = useState(true);

    const renderScreens = useCallback(() => {

        // if (isLoading) {
        //     return (
        //         <SplashStack.Navigator
        //             initialRouteName="Splash"
        //         >
        //             <SplashStack.Screen name="Splash" component={SplashPage} initialParams={{ setSplashLoad }} />
        //         </SplashStack.Navigator>
        //     )
        // }

        return (
            <MainStack.Navigator initialRouteName="Home">
                <MainStack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
                <MainStack.Screen name="SearchResult" component={SearchResultPage} options={{ headerShown: false }} />
                <MainStack.Screen name="MovieDetail" component={MovieDetailPage} options={{ headerShown: false }} />
                <MainStack.Screen name="VideoPlayer" component={VideoPlayerPage} options={{ headerShown: false }} />
            </MainStack.Navigator>
        );
    }, [isLoading]);

    return (
        <Provider store={store}>
            <NavigationContainer>
                {renderScreens()}
            </NavigationContainer>
        </Provider>
    );
}

export default App;
