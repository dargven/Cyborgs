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
import Zone from "./Zone";
import Projectile from "./Projectile";
import { useInterval } from "usehooks-ts";
import Debug from "./DebugInfo";
import useGame from "../../hooks/useGame";

interface ITextureObject {
    [key: string]: Texture
}

export interface IWeapons {
    [key: string]: number | null;
}

const Scene = () => {
    const {
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
    } = useGame();

    useEffect(() => {
        getScene();
        const mp = players.filter(p => p.token === store.getUser().token)[0];
        setMyPlayer(mp);
    }, []);

    useInterval(() => {
        getScene();
        if (myPlayer) {
            sendMyPlayer(myPlayer);
        }
    }, 50);

    document.addEventListener("mousemove", handleMouseMove);
    console.log(myPlayer)

    return (
        <group>
            <Physics gravity={[0, 0, 0]} colliders="hull">
                <LightMap />

                <FishTank />

                {myPlayer && <Debug player={myPlayer} debugRef={debugRef} />}

                {myPlayer && (
                    <Player
                        isControlled
                        hp={100}
                        key={myPlayer.token}
                        token={myPlayer.token}
                        teamId={myPlayer.teamId}
                        position={new Vector3(myPlayer.x, myPlayer.y, 0)}
                        velocity={new Vector3(myPlayer.vx, myPlayer.vy, 0)}
                        onFire={onFire}
                        onMovement={onMovement}
                        getMyPlayer={updatePlayer}
                    />
                )}

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

                <Zone position={new Vector3(5.5, 7.5, 0.5)} />
            </Physics>
            <Stars />
        </group>
    );
}

export default Scene;