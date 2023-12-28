import { Stars } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { useContext, useEffect, useRef, useState } from "react";
import { Texture, TextureLoader, Vector3 } from "three";
import { ServerContext, StoreContext } from "../../App";
import { TBullet, TPlayer } from "../../modules/Server/types";
import Bullet from "./Bullet/Bullet";
import Map from "./Map/Map";
import Dummy from "./Player/Dummy";
import Player from "./Player/Player";

export interface ITextureObject {
    [key: string]: Texture
}

export interface IWeapons {
    [key: string]: number | null;
}

const Scene = () => {

    const server = useContext(ServerContext);
    const store = useContext(StoreContext);

    const textureLoader = new TextureLoader();
    const TPROJECTILE = textureLoader.load('./assets/Bullets/Projectile.png');
    const room = textureLoader.load('./assets/rooms/cyborgs-office.png');

    const [textures] = useState<ITextureObject>({
        'room': room,
        'bullet': TPROJECTILE,
    });

    const timer = useRef<number>(0);

    const player = useRef<TPlayer>();
    const [bullets, setBullets] = useState<TBullet[]>([]);
    const [dummies, setDummies] = useState<TPlayer[]>([]);

    const sendBullet = (bullet: TBullet) => {
        server.shoot(bullet.x, bullet.y, bullet.vx, bullet.vy);
    }

    const sendMyPlayer = async (player: TPlayer) => {
        await server.setPlayer(player.x, player.y, player.vx, player.vy, 0, 0);
    };

    const getScene = async () => {
        const result = await server.getScene();
        if (result?.bullets) {
            setBullets(result.bullets);
            // bullets.current = result.bullets;
        }
        if (result?.players) {
            // dummies.current = result.players;
            setDummies(result.players);
        }
        if (result?.objects) {
            // objects.current = result.objects;
        }
    }

    useEffect(() => {
        getScene();
        player.current = dummies.filter(p => p.token === store.getUser().token)[0];

        const interval = setInterval(() => {
            getScene();
            if (player.current) {
                sendMyPlayer(player.current);
            }
        }, 250);

        return () => {
            clearInterval(interval);
        }
    }, []);

    const { viewport, camera, pointer } = useThree();

    const updatePlayer = (updated: TPlayer) => {
        player.current = updated;
    }

    const onMovement = (x: number, y: number) => {
        const cameraPos = new Vector3(x + pointer.x, y + pointer.y, 7);
        camera.position.lerp(cameraPos, 0.05);
        camera.updateProjectionMatrix();
    }
    const getDirection = () => {
        return new Vector3(pointer.x, pointer.y / viewport.aspect, 0).normalize();
    }

    const onFire = (x: number, y: number) => {
        const direction = new Vector3(pointer.x, pointer.y / viewport.aspect, 0);

        // смещение, чтобы игрок не мог расстрелять сам себя, придется фиксить под разные скорости
        direction.setLength(0.6);
        x += direction.x;
        y += direction.y;
        direction.setLength(15);

        const current = Date.now();

        if (.001 * (current - timer.current) > 1 / 1) {
            timer.current = current;

            const bullet: TBullet = {
                x,
                y,
                vx: direction.x,
                vy: direction.y,
                bulletId: bullets.length
            };
            sendBullet(bullet);
        }
    }

    return (
        <group>
            <Physics gravity={[0, 0, 0]} colliders="hull">

                {/* {player.current && <Debug player={player.current} debugRef={debugRef} />} */}

                {dummies.map(player => {
                    const token = store.getUser().token;
                    if (player.token !== token) {
                        return <Dummy
                            {...player}
                            // key={player.token}           //засоряет всю консоль
                        />
                    } else {
                        return <Player
                            {...player}
                            key={token}
                            onMovement={onMovement}
                            updatePlayer={updatePlayer}
                            onFire={onFire}
                            getDirection={getDirection}
                        />
                    }
                })}

                {bullets.map((bullet) =>
                    <Bullet
                        {...bullet}
                        key={bullet.bulletId}
                        texture={textures['bullet']}
                    />
                )}

                <Map texture={textures['room']} />

            </Physics>
            <Stars />
        </group>
    );
}

export default Scene;