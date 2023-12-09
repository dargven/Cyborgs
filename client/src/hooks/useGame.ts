import { useCallback, useContext, useRef, useState } from "react";
import { Group, TextureLoader, Vector3 } from "three";
import { TBullet, TDestructible, TPlayer } from "../modules/Server/types";
import { ServerContext, StoreContext } from "../App";
import { useThree } from "@react-three/fiber";
import CollidersPositions from "../components/Game/CollidersPositions";


const useGame = () => {

    const server = useContext(ServerContext);
    const store = useContext(StoreContext);


    const loadTextures = () => {
        const textureLoader = new TextureLoader();
        const TPROJECTILE = textureLoader.load('./assets/Bullets/Projectile.png');
        const room = textureLoader.load('./assets/rooms/map-office-plain.png');
        const glass = textureLoader.load('./assets/Map parts/Glass.png');

        return {
            'room': room,
            'bullet': TPROJECTILE,
            'glass': glass,
        }
    }

    const [textures] = useState(loadTextures);
    const [myBullets, setMyBullets] = useState<TBullet[]>([]);
    const [bullets, setBullets] = useState<TBullet[]>([]);
    const [players, setPlayers] = useState<TPlayer[]>([{token: store.getUser().token, teamId: 0, hp: 100, x: 0, y: 0, vx: 0, vy:0, dx: 0, dy:0}]);
    const [myPlayer, setMyPlayer] = useState<TPlayer>({token: store.getUser().token, teamId: 0, hp: 100, x: 0, y: 0, vx: 0, vy:0, dx: 0, dy:0});
    const [obstacles, setObstacles] = useState<TDestructible[]>();

    const sendBullet = (bullet: TBullet) => {
        server.setBullet(bullet.x, bullet.y, bullet.vx, bullet.vy)
    }

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

        if (debugRef.current) {
        debugRef.current.position.copy(camera.position).add(positionToCamera);
        }
    };

    const onFire = (position: Vector3, team: number) => {
        const direction = new Vector3(pointer.x, pointer.y / viewport.aspect, 0);
        direction.setLength(0.6);
        position.x += direction.x;
        position.y += direction.y;
        position.z = 0;
        direction.setLength(1);

        const current = Date.now();
        // Логика для стрельбы
    };

    const colliders = CollidersPositions();
    let colliderKeyCounter = 0;
    const generateColliderKey = () => {
        const key = `collider-${colliderKeyCounter}`;
        colliderKeyCounter++;
        return key;
    };

    return {
        textures,
        myBullets,
        bullets,
        myPlayer,
        players,
        obstacles,
        colliders,
        debugRef,

        store,

        getScene,
        updatePlayer,
        sendMyPlayer,
        setMyPlayer,
        handleMouseMove,
        onMovement,
        onFire,
        sendBullet,
        generateColliderKey,
    }
}

export default useGame;