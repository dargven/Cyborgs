import { TUser } from "./types";

export default class Server {
    private HOST: string;
    private token: string | null;

    constructor(HOST: string) {
        this.HOST = HOST;
        this.token = null;
    }

    async request<T>(method: string, params: any = {}): Promise<T | null> {
        try {
            if (this.token) {
                params.token = this.token;
            }
            const str = Object.keys(params)
                .map(key => `${key}=${params[key]}`)
                .join('&');
            const res = await fetch(`${this.HOST}/?method=${method}&${str}`);
            const answer = await res.json();
            if (answer.result === 'ok') {
                return answer.data;
            }
            console.log(
                `Ошибка: ${answer["error"]["code"]}, text: ${answer["error"]["text"]}`
            );
            return null;
        } catch (e) {
            return null;
        }
    }

    async login(login: string, password: string, rnd: number): Promise<TUser | null> {
        const result = await this.request<TUser>(
            'login',
            {login, password, rnd}
        );
        if (result?.token) {
            this.token = result.token;
            localStorage.setItem("token", this.token);
        }
        return result;
    }

    async logout(): Promise<boolean | null> {
        const result = await this.request<boolean>('logout');
        if (result) {
            this.token = null;
        }
        return result;
    }

    register(login: string, password: string): Promise<TUser | null> {
        return this.request<TUser>('register', {login, password});
    }

    autoregister(): Promise<TUser | null> { 
        return this.request<TUser>('autoregister');
    }
}