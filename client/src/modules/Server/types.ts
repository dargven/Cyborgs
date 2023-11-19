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
    name: string;
    message: string;
    created: string;
};

export type TMessages = Array<TMessage>;

export type TGetMessages = {
    messages: TMessages;
    hash: string;
}