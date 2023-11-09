import { Stars } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import { Group, Texture, TextureLoader, Vector3 } from "three";
import { Bullet, Laser } from "../../modules/Game/entities";
import { Gun } from "../../modules/Game/entities/Items";
import LaserGun from "../../modules/Game/entities/Items/LaserGun";
import CollidersPositions from "./CollidersPositions";
import Hitscan from "./Hitscan";
import Inventory from "./Inventory";
import LightMap from "./LightMap";
import MapObjects from "./MapObjects";
import Player from "./Player";
import Projectile from "./Projectile";
import Robot from "./Robot";
import Room from "./Room";
import Zone from "./Zone";

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
    const [lasers, setLasers] = useState<Laser[]>([]);
    const [weaponSlot, setWeaponSlot] = useState<number>(1);
    const [inventory, setInventory] = useState<any>([
        new Gun({
            name: 'tah gun',
            type: 1,
            damage: 99,
            rate: 20,
            magSize: 10,
            maxAmmo: 20,
            currentAmmo: 999999,
            speed: 6
        }), 
        new LaserGun({
            name: 'tough guy',
            type: 2,
            damage: 99,
            rate: 20,
            magSize: 10,
            maxAmmo: 20,
            currentAmmo: 999,
            speed: 6
        })
    ]);

    const [weapons, setWeapons] = useState<IWeapons>({
        slot1: 2,
        slot2: 1,
        slot3: null,
    });

    const [item, setItem] = useState<any>();
    const [last, setLast] = useState<number>(0);

    const colliders = CollidersPositions();
    const { viewport, camera, pointer } = useThree();
    const invRef = useRef<Group>();
    const positionToCamera = new Vector3(0, -2, -3);

    const onMovement = (position: Vector3) => {
        const cameraPos = new Vector3(position.x, position.y, 7);
        camera.position.lerp(cameraPos, 0.1);
        camera.updateProjectionMatrix();

        if (invRef.current) {
            invRef.current.position.copy(camera.position).add(positionToCamera);
        }
    }

    const onFire = (position: Vector3, team: number) => {
        if (weapons.slot1) {
            const direction = new Vector3(pointer.x, pointer.y / viewport.aspect, 0);

            // смещение, чтобы игрок не мог расстрелять сам себя, придется фиксить под разные скорости
            direction.setLength(0.6);
            position.x += direction.x;
            position.y += direction.y;
            position.z = 0;
            direction.setLength(1);
            const bullet = inventory[0].use(position, direction, `${1337}-${Date.now()}`, team);
    
            if (bullet) {
                setBullets((bullets) => [...bullets, bullet]);
            }
        }
        if (weapons.slot2) {
            const aimingPoint = new Vector3(pointer.x, pointer.y / viewport.aspect, 0);
            aimingPoint.setLength(5);
            aimingPoint.x += position.x;
            aimingPoint.y += position.y;
            const laser = inventory[1].use(position, aimingPoint, `${1337}-${Date.now()}`)
            if (laser) { 
                setLasers((lasers) => [...lasers, laser])
            }
        }
    }

    const getWeapon = (slot: number, id: number) => {
        setWeapons(prevWeapons => {
            const newWeapons = { ...prevWeapons };
    
            newWeapons[`slot${slot}`] = id;
    
            return newWeapons;
        });
    }

    let colliderKeyCounter = 0;

    const generateColliderKey = () => {
        const key = `collider-${colliderKeyCounter}`;
        colliderKeyCounter++;
        return key;
    };
    
    return (
        <group>
            <Physics gravity={[0, 0, 0]} colliders="hull" debug>
                <LightMap />

                <fog />

                <group position={[8, 5, 0]}>
                    <Player
                        id={1338}
                        team={1}
                        onFire={onFire}
                        onMovement={onMovement}
                        setWeaponSlot={setWeaponSlot}
                        isControlled
                    />
                    <Player team={2} />
                    <Player team={1} />
                    <Robot />
                </group>

                <Inventory invRef={invRef} setWeapon={weaponSlot} weapons={weapons}/>

                {colliders.map(collider =>
                    <RigidBody
                    key={generateColliderKey()}
                    type='fixed'
                    userData={{
                        type: "Collider"
                    }}>
                        <CuboidCollider
                            position={collider.position}
                            args={collider.args}
                            />
                    </RigidBody>
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

                {lasers.map(laser =>
                    <Hitscan
                        key={laser.key}
                        initialPosition={[laser.position.x, laser.position.y]}
                        aimingPoint={[laser.aimingPoint.x, laser.aimingPoint.y]}
                    />
                )}

                <group scale={[81, 61, 1]} position={[0, 0, 0]}>
                    <Room texture={textures['room']} />
                </group>

                <MapObjects textures={textures['glass']} position={new Vector3(0, 0, 0.1)} />

                <Zone position={new Vector3(5.5, 7.5, 0.5)} />
            </Physics>
            <Stars />
        </group>
    );
}

export default Scene;