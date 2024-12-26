import { useState } from "react"
import { GptMessage } from "../../components/chat-bubbles/GptMessage";
import { UserMessage } from "../../components/chat-bubbles/UserMessage";
import { TypingLoader } from "../../components/loaders/TypingLoader";
import { TextMessageBox } from "../../components/chat-input-boxes/TextMessageBox";
import { ProsConsUseCase } from "../../../core/use-cases/pros-cons-use-case";
import { GptMessageMarkdown } from "../../components/chat-bubbles/GptMessageMarkdown";




interface Message{
    text: string,
    isGPT: boolean
}


export const ProsConsPage = () => {

    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const handleMessage = async(text: string) => {
        setLoading(true);
        setMessages((prev) => [...prev, {text, isGPT: false} ]);

        // USE CASE
        // isGTP true
        const res = await ProsConsUseCase(text);
        console.log(res);
        if(!res.ok) return setMessages((prev) => [...prev, {text: res.message, isGPT: true} ]);

        setMessages((prev) => [...prev, {text: res.message.content, isGPT: true} ]);

        setLoading(false);

    }

    return(
        <div className="chat-container">
            <div className="chat-messages">
                <GptMessage text="Dime que deseas que compare" />
                {
                    messages.map( (message, index) => (
                        message.isGPT
                        ? (<GptMessageMarkdown key={index} text={message.text} />)
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