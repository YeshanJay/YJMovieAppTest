import { AppStateDef } from "../store/storeDef";


const initialState: AppStateDef = {

};

export const appReducer = (state = initialState, action): AppStateDef => {
    switch (action.type) {

        default:
            return state;
    }
}
