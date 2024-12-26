import { useState } from "react"
import { GptMessage } from "../components/chat-bubbles/GptMessage";
import { UserMessage } from "../components/chat-bubbles/UserMessage";
import { TypingLoader } from "../components/loaders/TypingLoader";
import { TextMessageBox } from "../components/chat-input-boxes/TextMessageBox";



interface Message{
    text: string,
    isGPT: boolean
}


export const template = () => {

    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const handleMessage = async(text: string) => {
        setLoading(true);
        setMessages((prev) => [...prev, {text, isGPT: false} ]);

        // USE CASE

        setLoading(false);

        // isGTP true
    }

    return(
        <div className="chat-container">
            <div className="chat-messages">
                <GptMessage text="¿Qué deseas extraño viajero?" />
                {
                    messages.map( (message, index) => (
                        message.isGPT
                        ? (<GptMessage key={index} text="Esto es de GTP" />)
                        : (<UserMessage key={index} text={message.text} />)
                    ))
                }

                {
                    loading && <TypingLoader className="transition" />
                }
            </div>

            <div className="chat-input">
                <TextMessageBox
                disableCorections
                placeholder="Insert name here" 
                handleSendMessage={handleMessage} />
            </div>
        </div>
    )
}