import "./Chat.css"

const Chat = () => {

    //const messagesContainer: HTMLElement | null = document.getElementById('messages'); // Контейнер сообщений — скрипт будет добавлять в него сообщения
    //let interval: NodeJS.Timer | null = null; // Переменная с интервалом подгрузки сообщений
    //const sendForm: HTMLFormElement | null = document.getElementById('chat-form'); // Форма отправки
    //const messageInput: HTMLInputElement | null = document.getElementById('message-text'); // Инпут для текста сообщения

    //function update() {
    // send_request('load');
    //}

    //if (interval === null) {
    //interval = setInterval(update, 500);
    //}

    //if (sendForm) {
    //sendForm.onsubmit = function (event: Event) {
        //send_request('send');
        //event.preventDefault(); // Используем preventDefault() вместо return false, чтобы остановить стандартную отправку формы
    //};
//}

    return (
        <div className="chatComponent"> 
            <div className='chat'>
                <div className="chat-messages">
                    <div className="chat-messages__content" id="messages">
                        СООБЩЕНИЕ
                    </div>
                </div>
                <div className="chat-input">
                    <form method="post" id="chat-form">
                        <input type="text" id="mesage-text" className="chat-form__input" placeholder="Введите сообщение"/>
                        <input type='submit' className="chat-form__submit" value='=>'/>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Chat;