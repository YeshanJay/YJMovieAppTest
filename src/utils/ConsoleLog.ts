
export class Console {

    static log(message? : any, ...optionalParams: any[]) {
        console.log(...arguments);
    }

    static debug(message? : any, ...optionalParams: any[]) {
        if (__DEV__) {
            console.log(...arguments);
        }
    }

    static error(message? : any, ...optionalParams: any[]) {
        console.log(...arguments);
        // console.error(...arguments);
    }

    static warn(message? : any, ...optionalParams: any[]) {
        console.warn(...arguments);
    }

}

