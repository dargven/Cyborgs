import { Stars, useKeyboardControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { CuboidCollider, Physics, RapierRigidBody, RigidBody, vec3 } from "@react-three/rapier";
import { createRef, useEffect, useRef, useState } from "react";
import { Group, Texture, TextureLoader, Vector3 } from "three";
import { Collider, Bullet, Laser } from "../../modules/Game/entities";
import CollidersPositions from "./CollidersPositions";
import Hitscan from "./Hitscan";
import LightMap from "./LightMap";
import MapObjects from "./MapObjects";
import Player, { IPlayerProps } from "./Player";
import Projectile from "./Projectile";
import Robot from "./Robot";
import Room from "./Room";
import Zone from "./Zone";
import Inventory from "./Inventory";
import { Gun, Item } from "../../modules/Game/entities/Items";

interface ISceneProps {
    playerProps: IPlayerProps;
    cameraProps: {
        vSize: number;
        aspect: number;
    }
}

interface ITextureObject {
    [key: string]: Texture
}

const playerRef = createRef<RapierRigidBody>(); // вынес из зависимостей useEffect

const Scene = (props: ISceneProps) => {
    const textureLoader = new TextureLoader();
    const TPROJECTILE = textureLoader.load('./assets/Bullets/Projectile.png');
    const room = textureLoader.load('./assets/rooms/map-office-plain.png');
    const glass = textureLoader.load('./assets/Map parts/Glass.png');

    const [controlKeys, getKeys] = useKeyboardControls();

    const [textures, setTextures] = useState<ITextureObject>({
        'room': room,
        'bullet': TPROJECTILE,
        'glass': glass,
    });
    const [isMoving, setMoving] = useState<boolean>(false);
    const [bullets, setBullets] = useState<Bullet[]>([]);
    const [lasers, setLasers] = useState<Laser[]>([]);
    const [weaponSlot, setWeaponSlot] = useState<number>(1);
    const [inventory, setInventory] = useState<Gun[]>([
        new Gun({
            name: 'pussy ripper',
            type: 1,
            damage: 99,
            rate: 20,
            magSize: 10,
            maxAmmo: 20,
            currentAmmo: 1,
            speed: 6
        })
    ]);
    const [item, setItem] = useState<Gun>(inventory[0]);
    const [last, setLast] = useState<number>(0);

    const colliders = CollidersPositions();
    const { viewport, camera, pointer } = useThree();
    const invRef = useRef<Group>();
    const positionToCamera = new Vector3(0, -2, -3);

    const movementController = (up: boolean, down: boolean, left: boolean, right: boolean) => {

        const speed = 4;

        playerRef.current?.setLinvel(new Vector3(), true);
        const velocity = new Vector3();
        if (left) {
            velocity.x -= 1;
        }
        if (right) {
            velocity.x += 1;
        }
        if (up) {
            velocity.y += 1;
        }
        if (down) {
            velocity.y -= 1;
        }

        velocity.setLength(speed);

        playerRef.current?.setLinvel(velocity, true);
    }

    const onFire = () => {
        const direction = new Vector3(pointer.x, pointer.y / viewport.aspect, 0);

        // смещение, чтобы игрок не мог расстрелять сам себя, придется фиксить под разные скорости
        const position = vec3(playerRef.current?.translation());
        direction.setLength(0.6);
        position.x += direction.x;
        position.y += direction.y;
        position.z = 0;
        direction.setLength(1);

        const bullet = item.use(position, direction, `${props.playerProps.id}-${Date.now()}`);

        // new Bullet(
        //     15,
        //     position,
        //     direction,
        //     `${props.playerProps.id}-${Date.now()}`
        // );

        if (bullet) {
            setBullets((bullets) => [...bullets, bullet]);
        }
    }

    useFrame(() => {

        const velocity = vec3(playerRef.current?.linvel());

        const { up, down, left, right, select1, select2, select3, shoot, hitscan } = getKeys();

        movementController(up, down, left, right);

        if (select1) {
            setWeaponSlot(1);
            setItem(inventory[0]);
        }
        if (select2) setWeaponSlot(2);
        if (select3) setWeaponSlot(3);

        const playerPosition = vec3(playerRef.current?.translation());

        const cameraPos = new Vector3(playerPosition.x, playerPosition.y, 7);
        camera.position.lerp(cameraPos, 0.1);
        camera.updateProjectionMatrix();

        if (invRef.current) {
            invRef.current.position.copy(camera.position).add(positionToCamera);
        }

        if (velocity.length() === 0) {
            setMoving(false)
        } else {
            setMoving(true)
        }

        if (shoot) {
            onFire();
        }

        // стрельба проджектайлами и хитсканом должна быть прописана на одно и то же нажатие, что именно полетит - зависит от выбора в инвентаре

        if (hitscan) {
            const aimingPoint = new Vector3(pointer.x, pointer.y / viewport.aspect, 0);
            aimingPoint.setLength(5);
            aimingPoint.x += playerPosition.x;
            aimingPoint.y += playerPosition.y;
            const laser = new Laser(
                playerPosition,
                aimingPoint,
                `${props.playerProps.id}-${Date.now()}`
            )
            setLasers((lasers) => [...lasers, laser])
        }
    });

    return (
        <group>
            <Physics gravity={[0, 0, 0]} colliders="hull" debug>

                <LightMap />

                <fog />

                <group position={[8, 5, 0]}>
                    <Player ref={playerRef} id={1338} isMoving={isMoving} />
                    <Player />
                    <Robot />
                </group>

                <Inventory invRef={invRef} setWeapon={weaponSlot} />

                {colliders.map(collider =>
                    <RigidBody
                        type='fixed'
                        userData={{
                            type: "Collider"
                        }}>
                        <CuboidCollider
                            position={collider.position}
                            args={collider.args}
                            key={collider.key}
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