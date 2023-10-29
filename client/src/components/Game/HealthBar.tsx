const HealthBar = () => {
    return (
        <sprite position={[0, 0.75, 0]} scale={[1, 0.25, 0]}>
            <spriteMaterial color={0xff0000} />
        </sprite>
    );
}

export default HealthBar;