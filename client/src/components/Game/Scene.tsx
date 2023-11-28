import { Stars } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { useContext, useEffect, useRef, useState } from "react";
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
import Zone from "./Zone";
import Projectile from "./Projectile";

interface ITextureObject {
    [key: string]: Texture
}

export interface IWeapons {
    [key: string]: number | null;
}

interface ISceneProps {
    vSize: number;
}

const Scene = ({ vSize }: ISceneProps) => {

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

    // const [character, setCharacter] = useState({
    //     position: new Vector3(),
    //     velocity: new Vector3()
    // });
    const [myBulets, setMyBulets] = useState<TBullet[]>([])

    const [bullets, setBullets] = useState<TBullet[]>([]);
    const [players] = useState<TPlayer[]>([{x: 0, y: 0, vx: 0, vy: 0, dx: 0, dy: 0, token: store.getUser().token, teamId: 1, hp: 100}]);
    const [obstacles] = useState<TDestructible[]>();
    // const [serverPlayers, setServerPlayers] = useState<TPlayer[]>([]);

    // const [last, setLast] = useState<number>(0);
    // const [inventory] = useState<Gun[]>([
    //     new Gun({
    //         name: 'tah gun',
    //         type: 1,
    //         damage: 50,
    //         rate: 1,
    //         magSize: 10,
    //         maxAmmo: 200,
    //         currentAmmo: 10000,
    //         speed: 6
    //     })
    // ]);

    useEffect(() => {
        const interval = setInterval(() => {
            myBulets.forEach((bullet, index) => {
                server.setBullets(bullet.bulletId, bullet.x, bullet.y, bullet.vx, bullet.vy)
            })
        }, 50)

        return () => clearInterval(interval)
    }, [myBulets])

    const sendBullet = (bullet: TBullet) => {
        server.setBullets(bullet.bulletId, bullet.x, bullet.y, bullet.vx, bullet.vy)
    }

    const mouseX = useRef(0);
    const mouseY = useRef(0);
    const invRef = useRef<Group>();
    const positionToCamera = new Vector3(0, -2, -3);
    
    const { viewport, camera, pointer, scene } = useThree();

    const handleMouseMove = (event: MouseEvent) => {
        mouseX.current = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY.current = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    document.addEventListener("mousemove", handleMouseMove);

    const onMovement = (position: Vector3) => {
        const cameraPos = new Vector3(position.x + mouseX.current, position.y + mouseY.current, 7);
        camera.position.lerp(cameraPos, 0.05);
        camera.updateProjectionMatrix();
        
        if (invRef.current) {
            invRef.current.position.copy(camera.position).add(positionToCamera);
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

    // const getWeapon = (slot: number, id: number) => {
    //     setWeapons(prevWeapons => {
    //         const newWeapons = { ...prevWeapons };
    //         newWeapons[`slot${slot}`] = id;
    //         return newWeapons;
    //     });
    // }
    
    const colliders = CollidersPositions();
    let colliderKeyCounter = 0;
    const generateColliderKey = () => {
        const key = `collider-${colliderKeyCounter}`;
        colliderKeyCounter++;
        return key;
    };

    // const getP = async () => {
        //     const sPlayers = await server.getPlayers();
        //     if (sPlayers) {
            //         setServerPlayers(sPlayers);
    //     }
    // }

    // const setP = async (position: Vector3, velocity: Vector3) => {
    //     await server.setPlayer(store.getUser().token, position.x, position.y, velocity.x, velocity.y);
    // }

    const getPosVel = (position: Vector3, velocity: Vector3) => {
        // setCharacter({
        //     position,
        //     velocity
        // })
    }

    // setP(new Vector3(0, 0, 0), new Vector3());

    // useEffect(() => {

    //     const interval = setInterval(() => {

    //         // setP(character.position, character.velocity);

    //         // getP();

    //         // const ps: PlayerEntity[] = [];
    //         // serverPlayers.forEach(sp => {
    //         //     const position = new Vector3(sp.x, sp.y, 0);
    //         //     const velocity = new Vector3(sp.vx, sp.vy, 0);
    //         //     const player = new PlayerEntity(sp.token, position, velocity);
    //         //     ps.push(player);
    //         // });

    //         // setPlayers(ps);
    //         // console.log(players);

    //     }, 1000);

    //     return () => {
    //         clearInterval(interval);
    //     }

    // }, [players]);

    return (
        <group>

            <Physics gravity={[0, 0, 0]} colliders="hull" debug>
                <LightMap />

                <FishTank />

                <FishTank />

                {players.map(player => {
                    const token = store.getUser().token;
                    if (player.token !== token) {
                        return <Player
                            teamId={player.teamId}
                            token={player.token}
                            position={new Vector3(player.x, player.y, 0)}
                            velocity={new Vector3(player.vx, player.vy, 0)}
                            key={player.token} />
                    } else {
                        return <Player
                            teamId={0}
                            token={player.token}
                            key={player.token}
                            onFire={onFire}
                            onMovement={onMovement}
                            getPosVel={getPosVel}
                            isControlled
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

                <Zone position={new Vector3(5.5, 7.5, 0.5)} />
            </Physics>
            <Stars />
        </group>
    );
}

export default Scene;