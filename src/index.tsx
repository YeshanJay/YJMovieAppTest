
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


enableScreens();


export const store = configureStore();


export type SplashStackParamListDef = {
    Splash: { setSplashLoad: (loading: boolean) => void; };
};
export type MainStackParamListDef = {
    Splash: { setSplashLoad: (loading: boolean) => void; };
    Home: undefined;
    SearchResult: undefined;
    MovieDetail: undefined;
};


const SplashStack = createNativeStackNavigator<SplashStackParamListDef>();
const MainStack = createNativeStackNavigator<MainStackParamListDef>();
const RootStack = createNativeStackNavigator();


const App = () => {
    const [isLoading, setSplashLoad] = useState(true);

    const renderScreens = useCallback(() => {

        // if (isLoading) {
        //     return (
        //         // <>
        //         //     <MainStack.Screen name="Splash" component={SplashPage} options={{ headerShown: false, ani }} initialParams={{ setSplashLoad }} />
        //         // </>


        //         <RootStack.Screen
        //             name="RootSplash"
        //             component={() =>
        //                 <SplashStack.Navigator
        //                     initialRouteName="Splash"
        //                 >
        //                     <SplashStack.Screen name="Splash" component={SplashPage} initialParams={{ setSplashLoad }} />
        //                 </SplashStack.Navigator>
        //             }
        //         />

        //     )
        // }

        return (
            // <>
            //     <MainStack.Screen name="Home" component={HomePage} options={{ headerShown: !(Platform.isTV && Platform.OS == "ios") }} />
            //     <MainStack.Screen name="SearchResult" component={SearchResultPage} />
            //     <MainStack.Screen name="MovieDetail" component={MovieDetailPage} />
            // </>

            // <RootStack.Screen
            //     name="RootMain"
            //     component={() =>
                    <MainStack.Navigator initialRouteName="Splash">
                        {/* {isLoading ?
                                     <MainStack.Screen name="Splash" component={SplashPage} initialParams={{ setSplashLoad }} /> : null               
                        } */}
                        <MainStack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
                        <MainStack.Screen name="SearchResult" component={SearchResultPage} />
                        <MainStack.Screen name="MovieDetail" component={MovieDetailPage} />
                    </MainStack.Navigator>
            //     }
            // />

        );
    }, [isLoading]);

    return (
        <Provider store={store}>
            <NavigationContainer>

                {/* <RootStack.Navigator > */}
                    {renderScreens()}
                {/* </RootStack.Navigator> */}

            </NavigationContainer>
        </Provider>
    );
}

export default App;
