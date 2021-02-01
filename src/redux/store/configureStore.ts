import { compose, createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";



const middleware = [
];

let composeEnhancers = compose;

// if (__DEV__) {
//     composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// }

const configureStore = () => {
    
    return createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(...middleware))
    );
};

export default configureStore;