import { Vector2, Vector3 } from "three";
import { TBullet, TDestructible, TPlayer } from "../Server/types";
import Server from "../Server/Server";
import { Store } from "../Store/Store";

interface IGame {
    bullets: TBullet[];
    objects: TDestructible[];
    players: TPlayer[];

    myPlayer: TPlayer;
    myBullets: TBullet[];

    cameraPosition: Vector3;
    mousePostion: Vector2;

    server: Server;
    store: Store;

    timestamp: number;
}

class Game implements IGame {

    bullets: TBullet[];
    objects: TDestructible[];
    players: TPlayer[];

    myPlayer: TPlayer;
    myBullets: TBullet[];

    cameraPosition: Vector3;
    mousePostion: Vector2;

    server: Server;
    store: Store;

    timestamp: number;

    constructor(server: Server, store: Store) {
        this.server = server;
        this.store = store;

        this.bullets = [];
        this.players = [];
        this.objects = [];

        this.timestamp = 0;

        this.cameraPosition = new Vector3();
        this.mousePostion = new Vector2();

        // получение данных о сцене, в т.ч. начальных данных об игроке

        this.getScene();

        const player = this.players.find(player => player.token === this.store.getUser().token); // здесь всегда должен найтись игрок, если ничего нету, то бэкендеры - долбоны
        this.myPlayer = player ?? {
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            dx: 0,
            dy: 0,
            hp: 100,
            teamId: null,
            token: 'no token'
        };
        this.myBullets = [];

        this.loop();
        this.handlePathChange();
        window.addEventListener('popstate', this.handlePathChange)
    }

    async getScene() {
        const result = await this.server.getScene();
        if (result?.bullets) {
            this.bullets = result.bullets;
        }
        if (result?.objects) {
            this.objects = result.objects;
        }
        if (result?.players) {
            this.players = result.players;
        }
    }

    setPlayer() {

    }

    setBullet() {

    }

    someCode = () => {
        return console.log('loop')
    }

    loop() {
        const intervalId = setInterval(() => {
            console.log('loop');
        }, 1000);

        console.log(intervalId)
        return intervalId
        // return () => {
        //     clearInterval(interval);
        // }
    }

    handlePathChange = () => {
        const currentPath = window.location.pathname;
        console.log(currentPath)

        if (currentPath === '/main') {
            clearInterval(this.loop());
            // this.loop();
        }
    };

    updateScene() {
        this.getScene()
    }
}

export default Game;