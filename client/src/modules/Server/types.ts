import { type } from "os";
import { Vector3 } from "three";

export { };

export type TError = {
    code: number,
    text: string,
}

export type TUser = {
    name: string,
    token: string,
    uuid: string,
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
    teamId: 0 | 1;
    hp: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    dx: number;
    dy: number;
    name: string;
    score: number;
    status: string;
    deaths: number;
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
    players: TPlayer[] | null;
    bullets: TBullet[] | null;
    objects: TDestructible[] | null;
    match: TMatch[] | null
}

export type TMatch = {
    matchStart : Date| null,
    matchEnd : Date | null,
    matchStatus : 'playing' | 'end' | 'not-playing '
}

export type THit = {
    token:string;
    bulletId: number;
}

export type TTeam = {
    teamId: number;
    token: string;
}

export type TTeamUser = {
    teamId: number;
    name: string;
    score: number;
    status: string;
    deaths: number;
}