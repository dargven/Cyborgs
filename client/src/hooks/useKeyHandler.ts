import { useEffect, useCallback } from 'react';

const useKeyHandler = (key: number, callback?: () => void) => {

    const handleKeyPress = useCallback(
        (event: KeyboardEvent) => {
            if (event.keyCode === key) {
                if (callback == undefined){
                    return null;
                }
                else
                    callback();
            }
        },
        [callback]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [handleKeyPress]);
};

export default useKeyHandler;