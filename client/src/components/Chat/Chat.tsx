import { useContext, useEffect, useRef, useState } from "react";
import { ServerContext } from "../../App";
import useEnterKeyHandler from "../../hooks/useKeyHandler";
import getError from "../../hooks/getError";
import { TMessage } from "../../modules/Server/types";
import { useNavigate } from "react-router-dom";
import "./Chat.css";

interface IChat {
    StopMove(): void
}

const Chat = ({ StopMove }: IChat) => {
    const chatMessagesRef = useRef<HTMLDivElement | null>(null);
    const chatRef = useRef<HTMLInputElement | null>(null);
    const errorRef = useRef<HTMLDivElement | null>(null);
    const server = useContext(ServerContext);

    const [messages, setMessages] = useState<TMessage[]>([]);

    const navigate = useNavigate();

    const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
    const toggleChat = () => {
        if (!isChatOpen && chatMessagesRef.current) {
            setScrollPosition(chatMessagesRef.current.scrollHeight);
        }
        setIsChatOpen((prevIsChatOpen) => !prevIsChatOpen);
    };
    const [scrollPosition, setScrollPosition] = useState<number>(0);

    
       

    const userTime = (created: string) => {
        const userTimezoneTimezone = new Date().getTimezoneOffset() / 60;
        const serverTimezone = -3;
        const resultTimezone = serverTimezone - userTimezoneTimezone;
        const substr = created.split(":")[0];
        let resultHour = resultTimezone + parseInt(substr);

        if (resultHour >= 24) {
            resultHour -= 24;
        }

        return `${resultHour}:${created.split(":")[1]}`;
    };useEffect(() => {
        if (chatMessagesRef.current) {
            // Adjust scroll position to the bottom when chat is open
            if (isChatOpen) {
                chatMessagesRef.current.scrollTop =
                    chatMessagesRef.current.scrollHeight;
            } else {
                // Restore the scroll position when the chat is closed
                chatMessagesRef.current.scrollTop = scrollPosition;
            }
        }
    }, [isChatOpen, scrollPosition]);

    const updateChat = async () => {
        const messagesFromServer = await server.getMessages();
        if (messagesFromServer) {
            setMessages(messagesFromServer);
        } else {
            if (server.error.code === 1002) {
                navigate("/login", { replace: true });
            }
        }
    };

    useEffect(() => {
        const interval = setInterval(updateChat, 2500);
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop =
                chatMessagesRef.current.scrollHeight;
        }
    }, [messages]);

    const handleChat = async () => {
        if (chatRef.current?.value) {
            document.getElementById('mesage-text')?.blur();
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
        <div className={`chatComponent ${isChatOpen ? 'open' : 'closed'}`}>
            {isChatOpen && (
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
                                        <span className="chname">{msg.name}:</span>
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
                                onClick={() => {
                                    StopMove()
                                }}
                            />
                            <button
                                className="chat-form__submit"
                                onClick={() => handleChat()}
                            >
                                Отправить
                            </button>
                        </div>
                    </div>
                </div>)}
            <button
                className="chat-toggle"
                onClick={toggleChat}
            >
                {isChatOpen ? "↓" : "чат"}
            </button>
        </div>
    );
};

export default Chat;
