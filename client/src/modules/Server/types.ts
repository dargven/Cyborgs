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

export type TSceneHashes = {
    bulletsHash: string;
    playersHash: string;
    objectsHash: string;
}

export type TGetScene = {
    hashes: TSceneHashes;
    scene: TScene;
}

export type TScene = {
    players: TPlayer[];
    bullets: TBullet[];
    objects: TDestructible[];
}

export type TTeam = {
    teamId: number,
    token: string,
}