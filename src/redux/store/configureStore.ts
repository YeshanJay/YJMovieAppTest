import { compose, createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";



const middleware = [
];

let composeEnhancers = compose;

const configureStore = () => {
    
    return createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(...middleware))
    );
};

export default configureStore;