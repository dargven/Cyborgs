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
    name: string;
    message: string;
    created: string;
};

export type TMessages = Array<TMessage>;

export type TGetMessages = {
    messages: TMessages;
    hash: string;
}

export type TPlayer = {
    token: string;
    teamId: number;
    hp: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    dx: number;
    dy: number;
}

export type TBullet = {
    token: string;
    bulletId: number
    x: number;
    y: number;
    vx: number;
    vy: number;
}

export type TDestructible = {
    objectId: number;
    state: 0 | 1;
}