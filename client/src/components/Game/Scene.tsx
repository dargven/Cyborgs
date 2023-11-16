import { Stars } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import { createRef, useContext, useEffect, useRef, useState } from "react";
import { Group, Texture, TextureLoader, Vector2, Vector3 } from "three";
import { Collider, Bullet, Laser } from "../../modules/Game/entities";
import CollidersPositions from "./CollidersPositions";
import Hitscan from "./Hitscan";
import LightMap from "./LightMap";
import MapObjects from "./MapObjects";
import Player from "./Player";
import Projectile from "./Projectile";
import Map from "./Map";
import Zone from "./Zone";
import Inventory from "./Inventory";
import { Gun, Item } from "../../modules/Game/items";
import Obstacle from "./Obstacle";
import Inventory2 from "../../modules/Game/misc/Inventory";
import PlayerEntity from "../../modules/Game/entities/PlayerEntity";
import { ServerContext, StoreContext } from "../../App";
import { Server } from "../../modules";
import { TPlayer } from "../../modules/Server/types";

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

    const [bullets, setBullets] = useState<Bullet[]>([]);
    // const [lasers, setLasers] = useState<Laser[]>([]);
    const [weaponSlot, setWeaponSlot] = useState<number>(1);
    const [inventory, setInventory] = useState<Gun[]>([
        new Gun({
            name: 'tah gun',
            type: 1,
            damage: 50,
            rate: 1,
            magSize: 10,
            maxAmmo: 200,
            currentAmmo: 10000,
            speed: 6
        })
    ]);

    const [weapons, setWeapons] = useState<IWeapons>({
        slot1: 2,
        slot2: 1,
        slot3: null,
    });

    const [gun, setGun] = useState<Gun>(inventory[0]);
    const [last, setLast] = useState<number>(0);

    const [otherPlayers, setOtherPlayers] = useState<PlayerEntity[]>([new PlayerEntity(store.getUser().token, new Vector3)]);
    const [dataPlayers, setServerPlayers] = useState<TPlayer[]>([]);

    const mouseX = useRef(0);
    const mouseY = useRef(0);

    const colliders = CollidersPositions();
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

    // const [inv, setInv] = useState<Inventory2>();

    const onFire = (position: Vector3, team: number) => {
        const direction = new Vector3(pointer.x, pointer.y / viewport.aspect, 0);

        // смещение, чтобы игрок не мог расстрелять сам себя, придется фиксить под разные скорости
        direction.setLength(0.6);
        position.x += direction.x;
        position.y += direction.y;
        position.z = 0;
        direction.setLength(1);

        const current = Date.now();

        if (.001 * (current - last) > 1 / gun.rate) {
            const bullet = gun.fire({
                position,
                direction,
                key: `${1337}-${Date.now()}`,
                team
            });

            if (bullet) {
                setBullets((bullets) => [...bullets, bullet]);
            }
            setLast(current);
        }
    }

    // const getWeapon = (slot: number, id: number) => {
    //     setWeapons(prevWeapons => {
    //         const newWeapons = { ...prevWeapons };
    //         newWeapons[`slot${slot}`] = id;
    //         return newWeapons;
    //     });
    // }

    let colliderKeyCounter = 0;

    const generateColliderKey = () => {
        const key = `collider-${colliderKeyCounter}`;
        colliderKeyCounter++;
        return key;
    };

    const getPlayers = async () => {
        const sPlayers = await server.getPlayers();
        // console.log(sPlayers);
        if (sPlayers) {
            setServerPlayers(sPlayers);
        }
    }

    const setPlayers = async (position: Vector3, velocity: Vector3) => {
        await server.setPlayer(store.getUser().token, position.x, position.y, velocity.x, velocity.y);
    }

    useEffect(() => {
        setPlayers(new Vector3(), new Vector3());
        const interval = setInterval(() => { // апдейт очков должен происходить раз в секунду, кроме тех случаев, когда игрок выходит из зоны

            getPlayers();

            const ps: PlayerEntity[] = [];
            setOtherPlayers([]);

            dataPlayers.forEach(sp => {
                if (store.getUser().token !== sp.token) {
                    const position = new Vector3(sp.x, sp.y, 0);
                    const velocity = new Vector3(sp.vx, sp.vy, 0);
                    const player = new PlayerEntity(sp.token, position, velocity);
                    ps.push(player);
                }
            });
            setOtherPlayers(ps);
        }, 10000);

        return () => {
            clearInterval(interval);
        }
    }, [dataPlayers, getPlayers, setPlayers, store]);

    return (
        <group>
            <Physics gravity={[0, 0, 0]} colliders="hull" debug>
                <LightMap />

                <fog />

                <Player
                    team={0}
                    token={store.getUser().token}
                    key={store.getUser().token}
                    onFire={onFire}
                    onMovement={onMovement}
                    setPlayers={setPlayers}
                    isControlled
                />

                {otherPlayers.map(player => {
                    const token = store.getUser().token;
                    if (player.token !== token) {
                        return <Player
                            team={0}
                            token={player.token}
                            position={player.position}
                            velocity={player.velocity}
                            key={player.token} />
                    }
                })}

                <Inventory invRef={invRef} setWeapon={weaponSlot} weapons={weapons} />

                {colliders.map(collider =>
                    <Obstacle
                        key={generateColliderKey()}
                        {...collider}
                    />
                )}

                {bullets.map(bullet =>
                    <Projectile
                        damage={bullet.damage}
                        key={bullet.key}
                        initialSpeed={bullet.speed}
                        initialPosition={bullet.position}
                        direction={bullet.direction}
                        texture={textures['bullet']}
                        team={bullet.team}
                    />
                )}

                {/* {lasers.map(laser =>
                    <Hitscan
                        key={laser.key}
                        initialPosition={[laser.position.x, laser.position.y]}
                        aimingPoint={[laser.aimingPoint.x, laser.aimingPoint.y]}
                    />
                )} */}

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