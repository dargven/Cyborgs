import { useContext, useEffect, useRef, useState } from "react";
import { ServerContext } from "../../App";
import "./Chat.css"

interface IMessage {
    name: string,
    message: string,
    created: string, 
}

const Chat = () => {
    const chatRef = useRef<HTMLInputElement | null>(null);
    const server = useContext(ServerContext);
    let interval: NodeJS.Timer | null = null;
    const [messages, setMessages] = useState<IMessage[]>([]);

    const updateChat = async () => {
        const messagesFromServer = await server.getMessage()
        // console.log(messagesFromServer)
        if(messagesFromServer) {
            setMessages(messagesFromServer);
        }
    }

    useEffect(() => {
        const interval = setInterval(updateChat, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleChat = async () => {
        if(chatRef.current?.value) {
            await server.sendMessage(chatRef.current?.value);
            chatRef.current.value = "";
        }
    }
    
    return (
        <div className="chatComponent"> 
            <div className='chat'>
                <div className="chat-messages">
                    <div className="chat-messages__content" id="messages">
                        {messages.map(msg => (
                            <p>{msg.created} {msg.name}:{msg.message}</p>
                        ))}
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