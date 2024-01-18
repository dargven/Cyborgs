import { TSceneHashes } from "../Server/types";

export class Store {
    private user = {
        name: '',
        isAuth: false,
        token: '',
    }

    public sceneHashes: TSceneHashes = { bulletsHash: '2', playersHash: '3', objectsHash: '5' };

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

    getUser() {
        return this.user;
    }
    
}