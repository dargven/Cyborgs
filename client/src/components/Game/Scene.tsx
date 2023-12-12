import { Stars } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Group, Texture, TextureLoader, Vector3 } from "three";
import { ServerContext, StoreContext } from "../../App";
import { TBullet, TDestructible, TPlayer } from "../../modules/Server/types";
import CollidersPositions from "./CollidersPositions";
import FishTank from "./Fishtank";
import LightMap from "./LightMap";
import Map from "./Map";
import MapObjects from "./MapObjects";
import Obstacle from "./Obstacle";
import Player from "./Player";
import Projectile from "./Projectile";
// import { useInterval } from "usehooks-ts";
import Debug from "./DebugInfo";

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

    const [myBullets, setMyBullets] = useState<TBullet[]>([]);
    const [bullets, setBullets] = useState<TBullet[]>([]);
    const [players, setPlayers] = useState<TPlayer[]>([]);
    const [myPlayer, setMyPlayer] = useState<TPlayer>();
    const [obstacles, setObstacles] = useState<TDestructible[]>();

    const sendBullet = (bullet: TBullet) => {
        server.setBullet(bullet.x, bullet.y, bullet.vx, bullet.vy)
    }

    // myBullets.forEach((bullet) => {
    //     server.setBullet(bullet.x, bullet.y, bullet.vx, bullet.vy)
    // });

    const updatePlayer = useCallback((player: TPlayer) => {
        setMyPlayer(player);

    }, [myPlayer]);

    const sendMyPlayer = async (player: TPlayer) => {
        await server.setPlayer(player.x, player.y, player.vx, player.vy, 0, 0)
    };

    const getScene = async () => {
        const result = await server.getScene();
        if (result?.bullets) {
            setBullets(result.bullets);
        }
        if (result?.players) {
            setPlayers(result.players);
        }
        if (result?.objects) {
            setObstacles(result.objects);
        }
    }


    useEffect(() => {
        getScene();
        const mp = players.filter(p => p.token === store.getUser().token)[0];
        setMyPlayer(mp);
    }, []);

    // useInterval(() => {
    //     getScene();
    //     if (myPlayer) {
    //         sendMyPlayer(myPlayer);
    //     }
    // }, 50);

    const mouseX = useRef(0);
    const mouseY = useRef(0);
    // const invRef = useRef<Group>();
    const debugRef = useRef<Group>();
    const positionToCamera = new Vector3(0, -2, -3);

    const { viewport, camera, pointer } = useThree();

    const handleMouseMove = (event: MouseEvent) => {
        mouseX.current = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY.current = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    document.addEventListener("mousemove", handleMouseMove);

    const onMovement = (position: Vector3) => {
        const cameraPos = new Vector3(position.x + mouseX.current, position.y + mouseY.current, 7);
        camera.position.lerp(cameraPos, 0.05);
        camera.updateProjectionMatrix();

        // if (invRef.current) {
        //     invRef.current.position.copy(camera.position).add(positionToCamera);
        // }

        if (debugRef.current) {
            debugRef.current.position.copy(camera.position).add(positionToCamera);
        }
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

                <FishTank />

                {myPlayer && <Debug player={myPlayer} debugRef={debugRef} />}

                {players.map(player => {
                    const token = store.getUser().token;
                    if (player.token !== token) {
                        return <Player
                            key={player.token}
                            token={player.token}
                            teamId={player.teamId}
                            position={new Vector3(player.x, player.y, 0)}
                            velocity={new Vector3(player.vx, player.vy, 0)}
                            hp={player.hp}
                        />
                    } else {
                        return <Player
                            isControlled
                            hp={player.hp}
                            key={token}
                            token={token}
                            teamId={0}
                            onFire={onFire}
                            onMovement={onMovement}
                            getMyPlayer={updatePlayer}
                        />
                    }
                })}

                {colliders.map(collider =>
                    <Obstacle
                        key={generateColliderKey()}
                        {...collider}
                    />
                )}

                {bullets.map(bullet =>
                    <Projectile
                        damage={100}
                        key={bullet.bulletId}
                        initialSpeed={10}
                        initialPosition={new Vector3(bullet.x, bullet.y, 0)}
                        direction={new Vector3(bullet.vx, bullet.vy)}
                        texture={textures['bullet']}
                        team={1}

                    />
                )}

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