import { Store } from "../Store/Store";
import { TGetMessages, TUser, TMessages, TMessage, TDestructible, TBullet, TPlayer, TScene, TSceneHashes, TGetScene, TTeam } from "./types";

// https://pablo.beget.com/phpMyAdmin/index.php логин: dargvetg_cyborgs пароль: vizual22cdxsaV

export default class Server {
    private HOST: string;
    private store: Store;
    private token: string | null;
    private chatHash: string = '123';
    private sceneHashes: TSceneHashes = { bulletsHash: '0', playersHash: '0', objectsHash: '0' };

    constructor(HOST: string, store: Store) {
        this.HOST = HOST;
        this.store = store;
        this.token = null;
    }

    async request<T>(method: string, params: any = {}): Promise<T | null> {
        try {
            if (this.token) {
                params.token = this.token;
            }
            const str = Object.keys(params)
                .map((key) => `${key}=${params[key]}`)
                .join("&");
            const res = await fetch(`${this.HOST}/?method=${method}&${str}`);
            const answer = await res.json();
            if (answer.result === "ok") {
                return answer.data;
            }
            const errorContainer = document.createElement("div");
            errorContainer.remove();
            errorContainer.style.color = "red";
            errorContainer.textContent = `${answer["error"]["text"]}`;
            document.body.appendChild(errorContainer);
            setTimeout(function () {
                if (errorContainer) {
                    errorContainer.remove();
                }
            }, 2000);
            console.log(
                `Ошибка: ${answer["error"]["code"]}, text: ${answer["error"]["text"]}`
            );
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
        if (result?.token) {
            this.token = result.token;
            this.store.setUser(login, this.token);
        }
        return result;
    }

    async logout(): Promise<boolean | null> {
        const result = await this.request<boolean>("logout");
        if (result) {
            this.token = null;
        }
        return result;
    }

    async resetPasswordByEmail(login: string): Promise<boolean | null> {
        return await this.request<boolean>("sendCodeToResetPassword", { login });
    }

    async getCodeToResetPassword(code: string): Promise<boolean | null> {
        return await this.request<boolean>("getCodeToResetPassword", { code })
    }

    async setPasswordAfterReset(hash: string): Promise<boolean | null> {
        return await this.request<boolean>("setPasswordAfterReset", { hash })
    }

    sendMessage(message: string): Promise<TMessage | null> {
        return this.request<TMessage>("sendMessage", {
            token: this.token,
            message,
        });
    }

    async getMessages(): Promise<TMessages | null> {
        const result = await this.request<TGetMessages>("getMessages", {
            token: this.token,
            hash: this.chatHash
        });
        if (result?.hash) {
            this.chatHash = result.hash;
            return result.messages;
        }
        return null;
    }

    async selectTeam(teamId: number): Promise<TTeam | null> {
        const result = await this.request<TTeam>("selectTeam", {
            token: this.token,
            teamId: teamId
        });

        if(result) {
            return result;
        }
        return null;
    }

    register(
        login: string,
        hash: string,
        name: string,
        email: string
    ): Promise<TUser | null> {
        return this.request<TUser>("register", { login, hash, name, email });
    }

    // gamedev сюда

    async getObjects(): Promise<TDestructible[] | null> {
        const result = await this.request<TDestructible[]>('getObjects', {
            token: this.token
        });

        if (result) {
            return result;
        }
        return null;
    }

    setBullets(bulletId: number, x: number, y: number, vx: number, vy: number): Promise<TBullet[] | null> {
        return this.request<TBullet[]>('getBullets', {
            token: this.token,
            bulletId: bulletId,
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

    async getScene(): Promise<TScene | null> {
        const result = await this.request<TGetScene>('getScene',
            {
                token: this.token,
                bulletsHash: this.sceneHashes.bulletsHash,
                playersHash: this.sceneHashes.playersHash,
                objectsHash: this.sceneHashes.objectsHash,
            });

        if (result) {
            this.sceneHashes = result.hashes;
            return result.scene;
        }

        return null;
    }
}