import {useCallback, useEffect} from 'react';

const useKeyHandler = (key: number, callback?: () => void) => {

    const handleKeyPress = useCallback(
        (event: KeyboardEvent) => {
            if (event.keyCode === key) {
                if (callback == undefined) {
                    return null;
                } else
                    callback();
            }
        },
        [callback]
    );

    window.onkeydown = event => {
        if(event.key  === 'Tab')
        {
            event.preventDefault();
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [handleKeyPress]);
};

export default useKeyHandler;