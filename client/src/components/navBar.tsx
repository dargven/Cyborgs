import NavButton from './navButton';

const NavBar = () => {  
    return (
        <header className="App-header">
            <NavButton to='/user' text='User' />
            
            <NavButton to='/registration' text='Registration' />

            <NavButton to='/login' text='Logout' /> 

            <NavButton to='/login' text='Sig In' />
        </header>
    );
}

export default NavBar;