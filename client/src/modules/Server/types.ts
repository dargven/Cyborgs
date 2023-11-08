export {};

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