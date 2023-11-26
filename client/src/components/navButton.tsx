import { useNavigate } from "react-router-dom";
import useKeyHandler from "../hooks/useKeyHandler";
type TnavButton = {
  to: string;
  text: string;
  className?: string;
  navFunction?(): string; 
};

function NavButton({ to, text, className }: TnavButton) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to, { replace: true })
  };

  return (
    <button className={className} onClick={handleClick}>
        {text}
    </button>
  );
}

export default NavButton;
