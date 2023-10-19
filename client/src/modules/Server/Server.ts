import {TUser} from "./types";
import md5 from 'md5-ts';

export default class Server {
    HOST: string;

    constructor(HOST: string) {
        this.HOST = HOST;
    }

    async request<T>(method: string, params: any): Promise<T | null> {
        try {
            const str = Object.keys(params)
                .map(key => `${key}=${params[key]}`)
                .join('&');
            const res = await fetch(`${this.HOST}/?method=${method}&${str}`);
            const answer = await res.json();
            if (answer.result === 'ok') {
                return answer.data;
            }
            // обработать ошибку(6 пункт)
            //...
            return null;
        } catch (e) {
            return null;
        }
    }

    login(login: string, password: string): Promise<TUser | null> {
        const rnd = Math.ceil(283 * Math.random());
        const hash = md5(md5(login + password) + rnd);
        return this.request<TUser>('login', {login, hash, rnd});
    }

    async register(login: string, email: string, password: string): Promise<TUser | null> {
        try {
            const hash = md5(login + password);
            const response = await this.request<TUser>('register', {login, hash});
            if (response !== null) {
                return response;
            } else {
                console.error("null");
                return null;
            }
        } catch (error) {
            console.error("Ошибка при отправке запроса");
            return null;
        }
    }

    // async  logout(login:string):Promise<void> {
    //     await out.progress("Выход из Аккаунта...", performLogout(login));
    // }
}