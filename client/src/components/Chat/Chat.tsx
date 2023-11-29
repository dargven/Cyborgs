import { useContext, useEffect, useRef, useState } from "react";
import { ServerContext } from "../../App";
import useEnterKeyHandler from "../../hooks/useKeyHandler";
import getError from "../../hooks/getError";
import "./Chat.css";
import { TMessage } from "../../modules/Server/types";
import { useNavigate } from "react-router-dom";

const Chat = () => {
    const chatMessagesRef = useRef<HTMLDivElement | null>(null);

    const chatRef = useRef<HTMLInputElement | null>(null);
    const errorRef = useRef<HTMLDivElement | null>(null);
    const server = useContext(ServerContext);
    let interval: NodeJS.Timer | null = null;
    const [messages, setMessages] = useState<TMessage[]>([]);

    const userTime = (created: string) => {
        const userTimezoneTimezone = new Date().getTimezoneOffset() / 60;
        const serverTimezone = -3;
        const resultTimezone = serverTimezone - userTimezoneTimezone;
        const substr = created.split(":")[0];
        const resultHour = resultTimezone + parseInt(substr);

        return `${resultHour}:${created.split(":")[1]}`;
    };
    const navigate = useNavigate();
    const updateChat = async () => {
        const messagesFromServer = await server.getMessages();
        if (messagesFromServer) {
            setMessages(messagesFromServer);
        } else {
            if (server.error.code === 1002) {
                navigate("/login");
            }
        }
    };

    useEffect(() => {
        const interval = setInterval(updateChat, 150);

        return () => {
            clearInterval(interval);
        };
    }, []);
    useEffect(() => {
        // Scroll to the top of the chat messages when messages change
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop =
                chatMessagesRef.current.scrollHeight;
        }
    }, [messages]);
    const handleChat = async () => {
        if (chatRef.current?.value) {
            await server.sendMessage(chatRef.current?.value);
            chatRef.current.value = "";
            errorRef.current!.innerText = "";
        } else {
            server.error.code = 706;
            errorRef.current!.innerText = getError(server.error);
        }
    };
    useEnterKeyHandler(13, handleChat);

    return (
        <div className="chatComponent">
            <div className="chat">
                <div className="chat-messages" ref={chatMessagesRef}>
                    <div className="chat-messages__content" id="messages">
                        {messages
                            .slice(0)
                            .reverse()
                            .map((msg) => (
                                <p className="chat-message">
                                    <span className="timestamp">
                                        {userTime(msg.created)}
                                    </span>
                                    <span className="name">{msg.name}:</span>
                                    <span className="message">
                                        {msg.message}
                                    </span>
                                </p>
                            ))}
                    </div>
                </div>
                <div className="chat-input">
                    <div ref={errorRef} className="errorDiv"></div>
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
