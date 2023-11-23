import { useContext, useEffect, useRef, useState } from "react";
import { ServerContext } from "../../App";
import useEnterKeyHandler from "../../hooks/useKeyHandler";
import "./Chat.css";
import { TMessage } from "../../modules/Server/types";

const Chat = () => {
    const chatRef = useRef<HTMLInputElement | null>(null);
    const server = useContext(ServerContext);
    let interval: NodeJS.Timer | null = null;
    const [messages, setMessages] = useState<TMessage[]>([]);

    const updateChat = async () => {
        const messagesFromServer = await server.getMessages();
        if (messagesFromServer) {
            setMessages(messagesFromServer);
        }
    };

    useEffect(() => {
        const interval = setInterval(updateChat, 150);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleChat = async () => {
        if (chatRef.current?.value) {
            await server.sendMessage(chatRef.current?.value);
            chatRef.current.value = "";
        }
    };
    useEnterKeyHandler(13, handleChat);

    return (
        <div className="chatComponent">
            <div className="chat">
                <div className="chat-messages">
                    <div className="chat-messages__content" id="messages">
                        {messages
                            .slice(0)
                            .reverse()
                            .map((msg) => (
                                <p>
                                    {msg.created} {msg.name}:{msg.message}
                                </p>
                            ))}
                    </div>
                </div>
                <div className="chat-input">
                    <div id="chat-form">
                        <input
                            ref={chatRef}
                            type="text"
                            id="mesage-text"
                            className="chat-form__input"
                            placeholder="Введите сообщение"
                        />
                        <button
                            className="chat-form__submit"
                            onClick={() => handleChat()}
                        >
                            Отправить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
