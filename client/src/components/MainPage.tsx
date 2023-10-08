import { useContext } from 'react';
import { ServerContext } from '../App';

import '../Auth.css'

const MainPage = () => {
    return (
    <div className="Main">
        <h1>Это основная страница</h1>
    <div className="bg"></div>
    <div className="bg bg2"></div>
    <div className="bg bg3"></div>
    </div>
    )
};

export default MainPage;