import { useEffect } from "react";

const useTab = () => {
    useEffect(() => {
        const handleTabKeyPress = (event:KeyboardEvent) => {
          if (event.key === "Tab") {
            const focusableInputs = document.querySelectorAll('input[tabindex="0"]');
            const focusedInput = document.activeElement as HTMLInputElement;
            const currentIndex = Array.from(focusableInputs).indexOf(focusedInput);
    
            if (currentIndex !== -1) {
              const nextIndex = (currentIndex + 1) % focusableInputs.length;
              (focusableInputs[nextIndex] as HTMLInputElement).focus();
              event.preventDefault();
            }
          }
        };
    
        document.addEventListener("keydown", handleTabKeyPress);
    
        return () => {
          document.removeEventListener("keydown", handleTabKeyPress);
        };
      }, []);
}

export default useTab;