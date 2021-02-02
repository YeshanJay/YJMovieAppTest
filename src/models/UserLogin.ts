
export class UserLogin {

    private static _instance = null;


    private constructor() {

    }


    static get isAuthenticated(): boolean {
        return (UserLogin._instance != null);
    }

    static get instance(): UserLogin {
        if (UserLogin._instance == null) {
            console.log("User login has not been created with authenticated credentials.");
        }

        return UserLogin._instance;
    }


    get authToken(): string {
        return null;
    }

}
