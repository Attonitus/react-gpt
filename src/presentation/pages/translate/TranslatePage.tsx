import { useState } from "react"
import { GptMessage } from "../../components/chat-bubbles/GptMessage";
import { UserMessage } from "../../components/chat-bubbles/UserMessage";
import { TypingLoader } from "../../components/loaders/TypingLoader";
import { TextMessageBoxSelect } from "../../components/chat-input-boxes/TextMessageBoxSelect";
import { translateUseCase } from "../../../core/use-cases/tranlaste-use-case";


interface Message{
    text: string,
    isGPT: boolean
}

const languages = [
    { id: "alemán", text: "Alemán" },
    { id: "árabe", text: "Árabe" },
    { id: "bengalí", text: "Bengalí" },
    { id: "francés", text: "Francés" },
    { id: "hindi", text: "Hindi" },
    { id: "inglés", text: "Inglés" },
    { id: "japonés", text: "Japonés" },
    { id: "mandarín", text: "Mandarín" },
    { id: "portugués", text: "Portugués" },
    { id: "ruso", text: "Ruso" },
];

export const TranslatePage = () => {

    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const handleMessage = async(text: string, lang: string) => {
        setLoading(true);
        setMessages((prev) => [...prev, {text, isGPT: false} ]);

        // USE CASE
        // isGTP true
        const {ok, message} = await translateUseCase(text, lang);
        if(!ok) return setMessages((prev) => [...prev, {text: message, isGPT: true} ]);

        setMessages((prev) => [...prev, {text: message, isGPT: true} ]);

        setLoading(false);
    }

    return(
        <div className="chat-container">
            <div className="chat-messages">
                <GptMessage text="¿Qué texto deseas traducir? 🦨" />
                {
                    messages.map( (message, index) => (
                        message.isGPT
                        ? (<GptMessage key={index} text={message.text} />)
                        : (<UserMessage key={index} text={message.text} />)
                    ))
                }

                {
                    loading && <TypingLoader className="transition" />
                }
            </div>

            <div className="chat-input">
                <TextMessageBoxSelect 
                    placeholder="Coloca lo que desees traducir"
                    handleSendMessage={handleMessage}
                    options={languages}
                />
            </div>
        </div>
    )
}