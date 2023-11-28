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

    getUser() {
        return this.user;
    }

    isAuth(): boolean {
        return this.user.isAuth;
    }
}