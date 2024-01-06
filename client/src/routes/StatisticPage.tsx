import NavButton from "../components/navButton"
import "./StaticPage.css"
const StatisticPage = () => {


    return (
        <>
            <div className="pageWrapper">
                <div className="pageTitle">Статистика игрока</div>
                <div className="container">
                    <div className="static">
                        <div>
                            всего игр
                            <div className="info">228</div>
                        </div>
                        <div>
                            победы
                            <div className="info">114</div>
                        </div>
                        <div>
                            поражения
                            <div className="info">114</div>
                        </div>
                    </div>
                    <div className="damage">
                        урон за все время
                        <div>
                            <div className="info-ace">128.481</div>
                            <div className="info-row">
                                <div>
                                    наивысший
                                    <div className="info">2763</div>
                                </div>
                                <div>
                                    средний
                                    <div className="info">321.4</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="kill">
                        убийств за все время
                        <div>
                            <div className="info-ace">1.095</div>
                            <div className="info-row">
                                <div>
                                    смертей
                                    <div className="info">556</div>
                                </div>
                                <div>
                                    k/d
                                    <div className="info">1.9</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <NavButton
                        to="/main"
                        text="вернуться в лобби"
                        className="Next"></NavButton>
                
            </div>
        </>
    );
};
export default StatisticPage