export class Store {
    private user = {
        name: '',
        isAuth: false,
        token: '',
    }

    setUser(name: string, token: string): void {
        this.user.name = name;
        this.user.isAuth = true;
        this.user.token = token;
    }

    setAuth() {
        this.user.isAuth = true;
    }

    isAuth(): boolean {
        return this.user.isAuth;
    }
    getUser(){
        return this.user;
    }
}