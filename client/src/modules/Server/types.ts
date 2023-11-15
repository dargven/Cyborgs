import { type } from "os";

export { };

export type TError = {
    code: number,
    text: string,
}

export type TUser = {
    name: string,
    token: string,
}

export type TMessage = {
    token: string,
    message: string,
};

export type TPlayer = {
    token: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
}