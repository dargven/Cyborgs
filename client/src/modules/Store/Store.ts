export class Store {
    private user = {
        name: '',
        isAuth: false,
        token: '',
        uuid: '',
    }

    setUser(name: string, token: string, uuid: string): void {
        this.user.name = name;
        this.user.isAuth = true;
        this.user.token = token;
        this.user.uuid = uuid;
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