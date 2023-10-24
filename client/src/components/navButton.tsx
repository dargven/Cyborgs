import { useNavigate } from 'react-router-dom';

//Пропсы
type TnavButton = {
  to: string;
  text: string;
}

function NavButton({ to, text }: TnavButton) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to, { replace: true });
  };

  return (
    <button className='header-right' onClick={handleClick}>
      {text}
    </button>
  );
}

export default NavButton;