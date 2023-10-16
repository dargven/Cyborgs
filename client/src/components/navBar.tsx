import { Link } from 'react-router-dom';
import { useContext } from 'react';
//import { AuthContext } from './AuthContext'; // Импортируйте свой контекст AuthContext

const NavBar = () => {
    //const { loginSuccess, setLoginSuccess } = useContext(AuthContext);

    return (
        <header className="App-header">
                <Link to="/user">
                    <button className='header-right'>
                        User
                    </button>
                </Link>

                <Link to="/register">
                    <button className='header-right'>
                        Registration
                    </button>
                </Link>

                <Link to="/login"> 
                    <button className='header-right'>
                        Logout
                    </button>
                </Link>

                <Link to="/login">
                    <button className='header-right'>
                        Sign In
                    </button>
                </Link>
        </header>
    );
}

export default NavBar;