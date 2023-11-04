export class Store {
    private user = {
        name: '',
        isAuth: false
    }

    setUser(name: string): void {
        this.user.name = name;
        this.user.isAuth = true;
    }

    getUser() {
        return this.user;
    }

    isAuth(): boolean {
        return this.user.isAuth;
    }

}