import { useNavigate } from "react-router-dom";
type TnavButton = {
  to: string;
  text: string;
  className?: string;
  navFunction?(): string; 
};

function NavButton({ to, text, className, navFunction }: TnavButton) {
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
