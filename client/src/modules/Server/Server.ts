import { Store } from "../Store/Store";
import { TUser } from "./types";

// https://pablo.beget.com/phpMyAdmin/index.php логин: dargvetg_cyborgs пароль: vizual22cdxsaV

export default class Server {
    private HOST: string;
    private store: Store;
    private token: string | null;

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
            this.store.setUser(login);
        }
        return result;
    }

    async logout(): Promise<boolean | null> {
        const result = await this.request<boolean>("logout");
        if (result) {
            this.token = null;
            console.log(result);
        }
        return result;
    }

    register(login: string, hash: string): Promise<TUser | null> {
        return this.request<TUser>("register", { login, hash });
    }
}
