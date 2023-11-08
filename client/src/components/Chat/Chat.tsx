import { useContext, useRef } from "react";
import "./Chat.css"
import { ServerContext } from "../../App";

const Chat = () => {
    const chatRef = useRef<HTMLInputElement | null>(null);
    const server = useContext(ServerContext);
    const token = 'HZ';
    let interval: NodeJS.Timer | null = null;

    const updateChat = () => {
        const messages = server.getMessage()
    }

    if (interval === null) {
        interval = setInterval(updateChat, 500);
    }

    const handleChat = async () => {
        if(chatRef.current?.value) {
            await server.sendMessage(chatRef.current?.value);
        }
    }
    

    return (
        <div className="chatComponent"> 
            <div className='chat'>
                <div className="chat-messages">
                    <div className="chat-messages__content" id="messages">
                        СООБЩЕНИЕ
                    </div>
                </div>
                <div className="chat-input">
                    <div id="chat-form">
                        <input ref={chatRef} type="text" id="mesage-text" className="chat-form__input" placeholder="Введите сообщение"/>
                        <button className="chat-form__submit" onClick={() => handleChat()}>Отправить</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;