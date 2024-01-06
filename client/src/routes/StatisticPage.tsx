import NavButton from "../components/navButton"
const StatisticPage=()=>{


    return(
    <>
        <div>
            Статистика игрока
        </div>
        <div>
            <div>всего игр
                <div>
                    228
                </div>
            </div>
            <div>
                победы
                <div>
                    114
                </div>
            </div>
            <div>
                поражения
                <div>
                    114
                </div>
            </div>
            <div>
                урон за всё время
                <div>
                    128.481
                    <div>
                        наивысший
                        <div>
                            2.783
                        </div>

                    </div>
                    <div>
                        средний
                        <div>
                            321,4
                        </div>
                    </div>
                </div>
            </div>
            <div>
                убийств за всё время
                <div>
                    1.095
                    <div>
                        смертей
                        <div>556</div>
                    </div>
                    <div>
                        k/d
                        <div>
                            1.9
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <NavButton
        to="/main"
        text="вернуться в лобби"
        className="Next"
        ></NavButton> 
    </>
    )
}
export default StatisticPage