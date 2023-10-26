const HealthBar = () => {
    return (
        <group position={[0, 0.75, 0]} scale={[1, 0.25, 0]}>
            <sprite>
                <spriteMaterial color={0xff0000} />
            </sprite>
        </group>
    );
}

export default HealthBar;