import { StyleProp } from "react-native";


export class StyleUtils {


    static resolveStyleIntoArray<T>(style: StyleProp<T> | StyleProp<T>[]): StyleProp<T>[] {
        let sty = [];
        if (style) {
            if ((style as Array<StyleProp<T>>).length) {
                sty = style as Array<StyleProp<T>>;
            } else {
                sty = [style];
            }
        }

        return sty;
    }

}

