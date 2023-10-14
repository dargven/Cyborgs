import { useContext } from 'react';
import { ServerContext } from '../App';
import Bg from './Bg';

import '../Auth.css'

const MainPage = () => {
    return (
    <div className="Main">
        <h1>Это основная страница</h1>
        <Bg/>
    </div>
    )
};

export default MainPage;