import { Store } from "../Store/Store";
import { TGetMessages, TUser, TMessages, TMessage, TError } from "./types";
import { error } from "console";

// https://pablo.beget.com/phpMyAdmin/index.php логин: dargvetg_cyborgs пароль: vizual22cdxsaV

export default class Server {
    private HOST: string;
    private store: Store;
    private token: string | null;
    private chatHash: string = "123";
    public error: TError;

    constructor(HOST: string, store: Store) {
        this.HOST = HOST;
        this.store = store;
        this.token = null;
        this.error = { code: 202, text: "" };
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
        return await this.request<boolean>("sendCodeToResetPassword", {
            login,
        });
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
            token: this.token,
            hash: this.chatHash,
        });
        if (result?.hash) {
            this.chatHash = result.hash;
            return result.messages;
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
}
