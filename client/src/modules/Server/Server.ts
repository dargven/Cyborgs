import { Store } from "../Store/Store";
import {
    TBullet,
    TDestructible,
    TError,
    TGetMessages, TGetScene,
    TMessage,
    TMessages,
    TPlayer, TScene,
    TSceneHashes,
    TTeam,
    TUser
} from "./types";

// https://pablo.beget.com/phpMyAdmin/index.php логин: dargvetg_cyborgs пароль: vizual22cdxsaV

export default class Server {
    private HOST: string;
    private store: Store;
    private uuid: string | null;
    private token: string | null;
    private chatHash: string = "123";
    public error: TError;


    constructor(HOST: string, store: Store) {
        this.HOST = HOST;
        this.store = store;
        this.uuid = localStorage.getItem('uuid');
        this.token = localStorage.getItem('token');
        this.error = { code: 202, text: " " };
    }

    async request<T>(method: string, params: any = {}): Promise<T | null> {
        try {
            if (this.token) {
                params.token = localStorage.getItem('token');
            }
            const str = Object.keys(params)
                .map((key) => `${key}=${params[key]}`)
                .join("&");
            const res = await fetch(`${this.HOST}/?method=${method}&${str}`);
            const answer = await res.json();
            if (answer.result === "ok") {
                this.error.code = 202;
                return answer.data;
            }
            this.error = answer.error;
            return null;
        } catch (e) {
            return null;
        }

    }

    async login(
        login: string,
        hash: string,
        rnd: number
    ): Promise<TUser | null> {
        const result = await this.request<TUser>("login", { login, hash, rnd });
        if (result?.token && result?.uuid) {
            localStorage.setItem('token', result.token);
            localStorage.setItem('uuid', result.uuid)
            this.store.setUser(login, result.token, result.uuid);
        }
        return result;
    }

    async autoLogin(): Promise<TUser | null> {
        const result = await this.request<TUser>("autoLogin", { uuid: this.uuid, token: this.token });
        if (result?.token) {
            localStorage.setItem('token', result.token);
            this.store.setUser(result.name, result.token, result.uuid);
        }
        return result;
    }

    async logout() {
        const result = await this.request<boolean>("logout", { token: localStorage.getItem('token') });
        if (result) {
            localStorage.removeItem('token')
            localStorage.removeItem('uuid')
        }
    }

    async resetPasswordByEmail(login: string): Promise<boolean | null> {
        return await this.request<boolean>("sendCodeToResetPassword", { login });
    }

    async getCodeToResetPassword(code: string): Promise<boolean | null> {
        return await this.request<boolean>("getCodeToResetPassword", { code });
    }

    async setPasswordAfterReset(hash: string): Promise<boolean | null> {
        return await this.request<boolean>("setPasswordAfterReset", { hash });
    }

    sendMessage(message: string): Promise<TMessage | null> {
        return this.request<TMessage>("sendMessage", {
            token: this.token,
            message,
        });
    }

    async getMessages(): Promise<TMessages | null> {
        const result = await this.request<TGetMessages>("getMessages", {
            token: localStorage.getItem("token"),
            hash: this.chatHash,
        });
        if (result?.hash) {
            this.chatHash = result.hash;
            return result.messages;
        }
        return null;
    }

    async register(
        login: string,
        hash: string,
        name: string,
        email: string
    ): Promise<TUser | null> {
        return this.request<TUser>("register", { login, hash, name, email });
    }

    async selectTeam(teamId: 0 | 1): Promise<TTeam | null> {
        const result = await this.request<TTeam>("selectTeam", {
            token: this.token,
            teamId: teamId
        });

        if (result) {
            return result;
        }
        return null;
    }
    async getObjects(): Promise<TDestructible[] | null> {
        const result = await this.request<TDestructible[]>('getObjects', {
            token: this.token
        });

        if (result) {
            return result;
        }
        return null;
    }

    setBullet(x: number, y: number, vx: number, vy: number): Promise<TBullet[] | null> {
        return this.request<TBullet[]>('setBullet', {
            token: this.token,
            x: x,
            y: y,
            vx: vx,
            vy: vy,
        });
    }

    async getBullets(): Promise<TBullet[] | null> {
        const result = await this.request<TBullet[]>('getBullets', {
            token: this.token
        });

        if (result) {
            return result;
        }
        return null;
    }

    async getPlayers(): Promise<TPlayer[] | null> {
        const result = await this.request<TPlayer[]>('getPlayers', {
            token: this.token
        });

        if (result) {
            return result;
        }
        return null;
    }

    async setPlayer(x: number, y: number, vx: number, vy: number, dx: number, dy: number): Promise<TPlayer[] | null> {
        return this.request<TPlayer[]>('setPlayer', {
            token: this.token,
            x: x,
            y: y,
            vx: vx,
            vy: vy,
            dx: dx,
            dy: dy,
        });
    }

    async getScene(): Promise<TScene | null> {
        const result = await this.request<TGetScene>('getScene',
            {
                token: this.token,
                bulletsHash: this.store.sceneHashes.bulletsHash,
                playersHash: this.store.sceneHashes.playersHash,
                objectsHash: this.store.sceneHashes.objectsHash,
            });

        if (result) {
            this.store.sceneHashes.bulletsHash = result.hashes.bulletsHash;
            this.store.sceneHashes.playersHash = result.hashes.playersHash;
            this.store.sceneHashes.objectsHash = result.hashes.objectsHash;
            return result.scene;
        }

        return null;
    }
}
