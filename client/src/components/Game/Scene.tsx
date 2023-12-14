import { Stars } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { useContext, useEffect, useRef, useState } from "react";
import { Texture, TextureLoader, Vector3 } from "three";
import { ServerContext, StoreContext } from "../../App";
import { TBullet, TDestructible, TPlayer } from "../../modules/Server/types";
import CollidersPositions from "./Map/CollidersPositions";
import LightMap from "./Map/LightMap";
import Map from "./Map/Map";
import MapObjects from "./Map/MapObjects";
import Obstacle from "./Map/Obstacle";
import Player from "./Player/Player";
import Projectile from "./Bullet/Bullet";
import Dummy from "./Player/Dummy";
import Game from "../../modules/Game/Game";

interface ITextureObject {
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
    const room = textureLoader.load('./assets/rooms/map-office-plain.png');
    const glass = textureLoader.load('./assets/Map parts/Glass.png');

    const [textures] = useState<ITextureObject>({
        'room': room,
        'bullet': TPROJECTILE,
        'glass': glass,
    });

    const player = useRef<TPlayer>();

    // const [myBullets, setMyBullets] = useState<TBullet[]>([]);
    // const [bullets, setBullets] = useState<TBullet[]>([]);
    const [dummies, setDummies] = useState<TPlayer[]>([]);
    // const [obstacles, setObstacles] = useState<TDestructible[]>();

    const sendBullet = (bullet: TBullet) => {
        server.setBullet(bullet.x, bullet.y, bullet.vx, bullet.vy)
    }

    // myBullets.forEach((bullet) => {
    //     server.setBullet(bullet.x, bullet.y, bullet.vx, bullet.vy)
    // });

    // const updatePlayer = useCallback((player: TPlayer) => {
    //     setMyPlayer(player);

    // }, [myPlayer]);

    const sendMyPlayer = async (player: TPlayer) => {
        await server.setPlayer(player.x, player.y, player.vx, player.vy, 0, 0)
    };

    const getScene = async () => {
        const result = await server.getScene();
        if (result?.bullets) {
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

    const onMovement = (position: Vector3) => {
        const cameraPos = new Vector3(position.x + pointer.x, position.y + pointer.y, 7);
        camera.position.lerp(cameraPos, 0.05);
        camera.updateProjectionMatrix();

        // if (debugRef.current) {
        //     debugRef.current.position.copy(camera.position).add(positionToCamera);
        // }
    }

    const onFire = (position: Vector3, team: number) => {
        const direction = new Vector3(pointer.x, pointer.y / viewport.aspect, 0);

        // смещение, чтобы игрок не мог расстрелять сам себя, придется фиксить под разные скорости
        direction.setLength(0.6);
        position.x += direction.x;
        position.y += direction.y;
        position.z = 0;
        direction.setLength(1);

        const current = Date.now();

        // if (.001 * (current - last) > 1 / inventory[0].rate) {
        //     const bullet = inventory[0].fire({
        //         position,
        //         direction,
        //         key: `${1337}-${Date.now()}`,
        //         team
        //     });

        //     if (bullet) {
        //         setBullets((bullets) => [...bullets, bullet]);
        //     }
        //     setLast(current);
        // }
    }

    const colliders = CollidersPositions();
    let colliderKeyCounter = 0;
    const generateColliderKey = () => {
        const key = `collider-${colliderKeyCounter}`;
        colliderKeyCounter++;
        return key;
    };

    return (
        <group>
            <Physics gravity={[0, 0, 0]} colliders="hull">
                <LightMap />

                {/* {player.current && <Debug player={player.current} debugRef={debugRef} />} */}

                {dummies.map(player => {
                    const token = store.getUser().token;
                    if (player.token !== token) {
                        return <Dummy
                            key={player.token}
                            token={player.token}
                            teamId={player.teamId}
                            x={player.x}
                            y={player.y}
                            vx={player.vx}
                            vy={player.vy}
                            dx={player.dx}
                            dy={player.dy}
                            hp={player.hp}
                        />
                    } else {
                        return <Player
                            hp={player.hp}
                            key={token}
                            token={token}
                            teamId={player.teamId}
                            x={player.x}
                            y={player.y}
                            vx={player.vx}
                            vy={player.vy}
                            dx={player.dx}
                            dy={player.dy}
                            onMovement={onMovement}
                            updatePlayer={updatePlayer}
                        // onFire={onFire}
                        />
                    }
                })}

                {colliders.map(collider =>
                    <Obstacle
                        key={generateColliderKey()}
                        {...collider}
                    />
                )}

                {/* {bullets.map(bullet =>
                    <Projectile
                        damage={100}
                        key={bullet.bulletId}
                        initialSpeed={10}
                        initialPosition={new Vector3(bullet.x, bullet.y, 0)}
                        direction={new Vector3(bullet.vx, bullet.vy)}
                        texture={textures['bullet']}
                        team={1}

                    />
                )} */}

                <group scale={[81, 61, 1]} position={[0, 0, 0]}>
                    <Map texture={textures['room']} />
                </group>

                <MapObjects textures={textures['glass']} position={new Vector3(0, 0, 0.1)} />
            </Physics>
            <Stars />
        </group>
    );
}

export default Scene;